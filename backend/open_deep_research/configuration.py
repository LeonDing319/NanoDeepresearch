"""Configuration management for the Open Deep Research system."""

import os
from enum import Enum
from typing import Any, Dict, List, Optional

from langchain_core.runnables import RunnableConfig
from pydantic import BaseModel, Field


class SearchAPI(Enum):
    """Enumeration of available search API providers."""

    DUCKDUCKGO = "duckduckgo"
    NONE = "none"

class StageCredential(BaseModel):
    """Per pipeline stage credentials (api_key + base_url + extra_body).

    Used by single research mode to bind different upstream models to different
    pipeline stages (thinking / compression / final_report).
    """

    api_key: Optional[str] = Field(default=None)
    base_url: Optional[str] = Field(default=None)
    extra_body: Optional[Dict[str, Any]] = Field(default=None)


class MCPConfig(BaseModel):
    """Configuration for Model Context Protocol (MCP) servers."""
    
    url: Optional[str] = Field(
        default=None,
        optional=True,
    )
    """The URL of the MCP server"""
    tools: Optional[List[str]] = Field(
        default=None,
        optional=True,
    )
    """The tools to make available to the LLM"""
    auth_required: Optional[bool] = Field(
        default=False,
        optional=True,
    )
    """Whether the MCP server requires authentication"""

class Configuration(BaseModel):
    """Main configuration class for the Deep Research agent."""
    
    # General Configuration
    # SIMPLIFIED: User-provided API key (replaces complex apiKeys system)
    user_api_key: str = Field(
        default="",
        metadata={
            "x_oap_ui_config": {
                "type": "string",
                "default": "",
                "description": "User's API key for the selected model provider"
            }
        }
    )

    # Base URL for OpenAI-compatible APIs (for concurrent-safe model switching)
    base_url: Optional[str] = Field(
        default=None,
        metadata={
            "x_oap_ui_config": {
                "type": "string",
                "default": None,
                "description": "Base URL for OpenAI-compatible API endpoints (e.g., Zhipu, DeepSeek, DeepSeek V4 Pro, Kimi K2.6)"
            }
        }
    )

    # Extra body params for model request (e.g., disable thinking for DeepSeek V4 Pro and Kimi K2.6)
    extra_body: Optional[Dict[str, Any]] = Field(
        default=None,
        metadata={
            "x_oap_ui_config": {
                "type": "json",
                "default": None,
                "description": "Extra body params forwarded to the model API. Used to disable thinking mode for direct provider APIs that require reasoning_content multi-turn preservation."
            }
        }
    )

    # Per stage credentials for multi stage single research mode (research / compression / final_report)
    # If set, overrides the global user_api_key / base_url / extra_body for that stage.
    # Compare research mode leaves this None and falls back to the globals.
    stage_credentials: Optional[Dict[str, StageCredential]] = Field(
        default=None,
        metadata={
            "x_oap_ui_config": {
                "type": "json",
                "default": None,
                "description": "Per pipeline stage credentials (research / compression / final_report). Each entry has api_key / base_url / extra_body. Falls back to globals when not set."
            }
        }
    )

    max_structured_output_retries: int = Field(
        default=3,
        metadata={
            "x_oap_ui_config": {
                "type": "number",
                "default": 3,
                "min": 1,
                "max": 10,
                "description": "Maximum number of retries for structured output calls from models"
            }
        }
    )
    allow_clarification: bool = Field(
        default=True,
        metadata={
            "x_oap_ui_config": {
                "type": "boolean",
                "default": True,
                "description": "Whether to allow the researcher to ask the user clarifying questions before starting research"
            }
        }
    )
    max_concurrent_research_units: int = Field(
        default=5,
        metadata={
            "x_oap_ui_config": {
                "type": "slider",
                "default": 5,
                "min": 1,
                "max": 20,
                "step": 1,
                "description": "Maximum number of research units to run concurrently. This will allow the researcher to use multiple sub-agents to conduct research. Note: with more concurrency, you may run into rate limits."
            }
        }
    )
    # Research Configuration
    search_api: SearchAPI = Field(
        default=SearchAPI.DUCKDUCKGO,
        metadata={
            "x_oap_ui_config": {
                "type": "select",
                "default": "duckduckgo",
                "description": "Search API to use for research. NOTE: Make sure your Researcher Model supports the selected search API.",
                "options": [
                    {"label": "DuckDuckGo (Free, no API key)", "value": SearchAPI.DUCKDUCKGO.value},
                    {"label": "None", "value": SearchAPI.NONE.value}
                ]
            }
        }
    )
    max_researcher_iterations: int = Field(
        default=6,
        metadata={
            "x_oap_ui_config": {
                "type": "slider",
                "default": 6,
                "min": 1,
                "max": 10,
                "step": 1,
                "description": "Maximum number of research iterations for the Research Supervisor. This is the number of times the Research Supervisor will reflect on the research and ask follow-up questions."
            }
        }
    )
    max_react_tool_calls: int = Field(
        default=10,
        metadata={
            "x_oap_ui_config": {
                "type": "slider",
                "default": 10,
                "min": 1,
                "max": 30,
                "step": 1,
                "description": "Maximum number of tool calling iterations to make in a single researcher step."
            }
        }
    )
    # Model Configuration
    research_model: str = Field(
        default="openai:gpt-4.1",
        metadata={
            "x_oap_ui_config": {
                "type": "text",
                "default": "openai:gpt-4.1",
                "description": "Model for conducting research. NOTE: Make sure your Researcher Model supports the selected search API."
            }
        }
    )
    research_model_max_tokens: int = Field(
        default=10000,
        metadata={
            "x_oap_ui_config": {
                "type": "number",
                "default": 10000,
                "description": "Maximum output tokens for research model"
            }
        }
    )
    research_model_provider: str = Field(
        default="openai",
        metadata={
            "x_oap_ui_config": {
                "type": "text",
                "default": "openai",
                "description": "Model provider for research model (openai, anthropic, etc.)"
            }
        }
    )
    compression_model: str = Field(
        default="openai:gpt-4.1",
        metadata={
            "x_oap_ui_config": {
                "type": "text",
                "default": "openai:gpt-4.1",
                "description": "Model for compressing research findings from sub-agents. NOTE: Make sure your Compression Model supports the selected search API."
            }
        }
    )
    compression_model_max_tokens: int = Field(
        default=8192,
        metadata={
            "x_oap_ui_config": {
                "type": "number",
                "default": 8192,
                "description": "Maximum output tokens for compression model"
            }
        }
    )
    compression_model_provider: str = Field(
        default="openai",
        metadata={
            "x_oap_ui_config": {
                "type": "text",
                "default": "openai",
                "description": "Model provider for compression model (openai, anthropic, etc.)"
            }
        }
    )
    final_report_model: str = Field(
        default="openai:gpt-4.1",
        metadata={
            "x_oap_ui_config": {
                "type": "text",
                "default": "openai:gpt-4.1",
                "description": "Model for writing the final report from all research findings"
            }
        }
    )
    final_report_model_max_tokens: int = Field(
        default=10000,
        metadata={
            "x_oap_ui_config": {
                "type": "number",
                "default": 10000,
                "description": "Maximum output tokens for final report model"
            }
        }
    )
    final_report_model_provider: str = Field(
        default="openai",
        metadata={
            "x_oap_ui_config": {
                "type": "text",
                "default": "openai",
                "description": "Model provider for final report model (openai, anthropic, etc.)"
            }
        }
    )
    # MCP server configuration
    mcp_config: Optional[MCPConfig] = Field(
        default=None,
        optional=True,
        metadata={
            "x_oap_ui_config": {
                "type": "mcp",
                "description": "MCP server configuration"
            }
        }
    )
    mcp_prompt: Optional[str] = Field(
        default=None,
        optional=True,
        metadata={
            "x_oap_ui_config": {
                "type": "text",
                "description": "Any additional instructions to pass along to the Agent regarding the MCP tools that are available to it."
            }
        }
    )


    @classmethod
    def from_runnable_config(
        cls, config: Optional[RunnableConfig] = None
    ) -> "Configuration":
        """Create a Configuration instance from a RunnableConfig."""
        configurable = config.get("configurable", {}) if config else {}
        field_names = list(cls.model_fields.keys())
        values: dict[str, Any] = {
            field_name: os.environ.get(field_name.upper(), configurable.get(field_name))
            for field_name in field_names
        }
        return cls(**{k: v for k, v in values.items() if v is not None})

    class Config:
        """Pydantic configuration."""
        
        arbitrary_types_allowed = True