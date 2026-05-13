# Directory: deep-research-backend/services/model_service.py
"""
Model Service - Manages AI model configurations and availability
Supports Zhipu GLM (via Volcengine ARK), DeepSeek V3.2 (via Volcengine ARK),
DeepSeek V4 Pro (via api.deepseek.com), and Kimi K2.6 (via api.moonshot.cn)
"""

import logging
from typing import Dict, List, Optional
from models.research_models import AvailableModel

logger = logging.getLogger(__name__)


class ModelService:
    """Service for managing AI model configurations and capabilities"""

    def __init__(self):
        """Initialize the model service with supported models"""
        self._models = self._initialize_models()

    def _initialize_models(self) -> Dict[str, AvailableModel]:
        """Initialize supported AI models with their configurations"""
        return {
            "zhipu": AvailableModel(
                id="zhipu",
                name="智谱 GLM-4.7 (SOTA)",
                provider="智谱AI",
                description="GLM-4.7 - 智谱最新旗舰模型，支持交错式思考和保留式思考，编程与推理能力大幅提升",
                capabilities=[
                    "web_search",
                    "document_analysis",
                    "code_analysis",
                    "multi-step_reasoning",
                    "structured_output",
                    "interleaved_thinking"
                ],
                max_tokens=128000
            ),
            "deepseek": AvailableModel(
                id="deepseek",
                name="DeepSeek V3.2 (SOTA)",
                provider="DeepSeek",
                description="DeepSeek V3.2 - 671B MoE模型，GPT-5级性能，支持思考模式和工具调用",
                capabilities=[
                    "web_search",
                    "document_analysis",
                    "code_analysis",
                    "multi-step_reasoning",
                    "structured_output",
                    "thinking_mode",
                    "tool_calling"
                ],
                max_tokens=128000
            ),
            "deepseek_v4_pro": AvailableModel(
                id="deepseek_v4_pro",
                name="DeepSeek V4 Pro",
                provider="DeepSeek",
                description="DeepSeek V4 Pro - 1.6T总参数 / 49B激活，1M上下文，思考与非思考双模式",
                capabilities=[
                    "web_search",
                    "document_analysis",
                    "code_analysis",
                    "multi-step_reasoning",
                    "structured_output",
                    "thinking_mode",
                    "tool_calling",
                    "long_context"
                ],
                max_tokens=1000000
            ),
            "kimi_k2_6": AvailableModel(
                id="kimi_k2_6",
                name="Kimi K2.6",
                provider="Moonshot AI",
                description="Kimi K2.6 - 1T总参数 MoE 模型，256K 上下文，思考模式默认开启",
                capabilities=[
                    "web_search",
                    "document_analysis",
                    "code_analysis",
                    "multi-step_reasoning",
                    "structured_output",
                    "thinking_mode",
                    "tool_calling",
                    "long_context"
                ],
                max_tokens=256000
            ),
        }
    
    async def get_available_models(self) -> Dict[str, List[AvailableModel]]:
        """
        Get list of available AI models
        
        Returns:
            Dict containing available models and metadata
        """
        try:
            return {
                "models": list(self._models.values()),
                "total_count": len(self._models),
                "supported_providers": ["智谱AI", "DeepSeek", "Moonshot AI"]
            }
        except Exception as e:
            logger.error(f"Error getting available models: {str(e)}")
            raise
    
    def get_model_config(self, model_id: str) -> Optional[AvailableModel]:
        """
        Get configuration for a specific model
        
        Args:
            model_id: Model identifier
            
        Returns:
            Model configuration or None if not found
        """
        return self._models.get(model_id)
    
    def validate_model(self, model_id: str) -> bool:
        """
        Validate if a model is supported
        
        Args:
            model_id: Model identifier to validate
            
        Returns:
            True if model is supported, False otherwise
        """
        return model_id in self._models
    
    def get_model_provider_mapping(self) -> Dict[str, str]:
        """
        Get mapping of model IDs to their LangChain model names

        Returns:
            Dictionary mapping model IDs to LangChain model names
        """
        return {
            # 智谱 GLM-4.7 - 火山引擎ARK平台 Endpoint ID
            "zhipu": "ep-20260210043232-fc9nz",
            # DeepSeek V3.2 - 火山引擎ARK平台 Endpoint ID
            "deepseek": "ep-20260210052620-d8jdr",
            # DeepSeek V4 Pro - api.deepseek.com model name
            "deepseek_v4_pro": "deepseek-v4-pro",
            # Kimi K2.6 - api.moonshot.cn model name
            "kimi_k2_6": "kimi-k2.6"
        }
    
    def get_api_key_env_var(self, model_id: str) -> Optional[str]:
        """
        Get the environment variable name for a model's API key
        
        Args:
            model_id: Model identifier
            
        Returns:
            Environment variable name or None
        """
        env_vars = {
            "zhipu": "ZHIPU_API_KEY",             # 智谱AI API Key
            "deepseek": "ARK_API_KEY",             # DeepSeek V3.2 via 火山引擎ARK平台
            "deepseek_v4_pro": "DEEPSEEK_API_KEY", # DeepSeek V4 Pro via api.deepseek.com
            "kimi_k2_6": "KIMI_API_KEY"            # Kimi K2.6 via api.moonshot.cn
        }
        return env_vars.get(model_id)
