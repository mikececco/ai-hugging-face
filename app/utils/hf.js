import { HfInference } from '@huggingface/inference'
import { HfAgent } from '@huggingface/agents';

const TOKEN = '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'
export const inference = new HfInference(TOKEN)
