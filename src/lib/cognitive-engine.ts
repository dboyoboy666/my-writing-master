import { AIMessage, CognitiveStage, SocraticQuestion } from '@/types/ai';

/**
 * 三阶认知迭代引擎
 * AI在任一环节必须遵循的SOP：
 * 1. 启发式引导 (Spark)：发散思维，通过思维导图拓宽思路（解决“想不出”）。
 * 2. 苏格拉底式追问 (Dig)：逼问细节，调用五感（解决“写不细”）。
 * 3. 批判性思维挑刺 (Refine)：逻辑找茬、用词去敏、角色反转（解决“写不深”）。
 */

export class CognitiveEngine {
  private apiKey: string;
  private model: string = 'claude-3-5-sonnet-20241022';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * 启发式引导 - 发散思维
   */
  async spark(topic: string, materials: string[]): Promise<string> {
    const prompt = `【启发式引导阶段】
你是一位中学语文写作专家，正在帮助学生构思记叙文。
题目：${topic}

已有素材：
${materials.map(m => `- ${m}`).join('\n')}

请执行以下任务：
1. 高亮题目中的关键词，分析其深层含义
2. 提供3-5个不同的写作角度或立意方向
3. 针对每个方向，提出1-2个可以挖掘的素材线索
4. 使用思维导图的方式展开联想

要求：
- 语言亲切自然，像导师一样引导
- 不要直接给答案，而是启发思考
- 使用生动的比喻和例子
- 控制在300字以内`;

    return await this.callAI(prompt, 'spark');
  }

  /**
   * 苏格拉底式追问 - 逼问细节
   */
  async dig(material: string): Promise<SocraticQuestion[]> {
    const prompt = `【苏格拉底式追问阶段】
学生提供了一个素材片段：
"${material}"

请生成5个苏格拉底式追问，帮助学生挖掘细节。追问应该覆盖：
1. 感官层面：视觉、听觉、嗅觉、触觉、味觉
2. 情感层面：当时的感受、情绪变化
3. 逻辑层面：因果关系、时间顺序
4. 视角层面：如果从他人角度看会怎样

每个追问格式：
- 类别：[sensory|emotional|logical|perspective]
- 问题：[具体问题]
- 提示：[可选的引导提示]

示例：
- 类别：sensory
- 问题：那一刻你听到了什么声音？这个声音给你什么感觉？
- 提示：试着回忆环境中的细微声响`;

    const response = await this.callAI(prompt, 'dig');

    // 解析AI返回的追问
    const questions: SocraticQuestion[] = [];
    const lines = response.split('\n');

    let currentQuestion: Partial<SocraticQuestion> = {};

    for (const line of lines) {
      if (line.includes('类别：')) {
        currentQuestion.category = line.includes('sensory') ? 'sensory' :
                                   line.includes('emotional') ? 'emotional' :
                                   line.includes('logical') ? 'logical' : 'perspective';
      } else if (line.includes('问题：')) {
        currentQuestion.question = line.replace('问题：', '').trim();
      } else if (line.includes('提示：')) {
        currentQuestion.hint = line.replace('提示：', '').trim();
      }

      if (currentQuestion.category && currentQuestion.question) {
        questions.push(currentQuestion as SocraticQuestion);
        currentQuestion = {};
      }
    }

    return questions;
  }

  /**
   * 批判性思维挑刺 - 逻辑找茬
   */
  async refine(draft: string): Promise<string> {
    const prompt = `【批判性思维挑刺阶段】
请对以下作文草稿进行"汉堡包评价法"点评：

草稿内容：
${draft}

点评要求：
1. 先夸（第一层面包）：找出2-3个亮点，具体说明好在哪里
2. 再批（中间肉饼）：
   - 逻辑漏洞：时间、因果关系是否合理
   - 用词问题：是否有敏感词、不当表达
   - 角色一致性：人物行为是否符合设定
   - 细节缺失：哪些地方可以更具体
3. 最后鼓励（第二层面包）：给出改进方向和信心

注意：
- 语气要温和，保护学生自尊心
- 具体指出问题所在，不要空泛
- 给出可操作的修改建议
- 控制在400字以内`;

    return await this.callAI(prompt, 'refine');
  }

  /**
   * 调用AI API
   */
  private async callAI(prompt: string, stage: CognitiveStage): Promise<string> {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 1024,
          temperature: 0.7,
          system: '你是一位经验丰富的中学语文写作导师，擅长用启发式、苏格拉底式和批判性思维方法指导学生写作。',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('AI API call failed:', error);
      return 'AI服务暂时不可用，请稍后再试。';
    }
  }

  /**
   * 上下文压缩 - 每过一关总结当前状态
   */
  async compressContext(messages: AIMessage[]): Promise<string> {
    const context = messages.map(m => `[${m.role}]: ${m.content}`).join('\n');

    const prompt = `请将以下对话压缩成200字以内的摘要，保留关键信息：

${context}

摘要要求：
- 包含学生的核心想法和素材
- 记录已完成的步骤
- 标注待解决的问题
- 语言简洁明了`;

    return await this.callAI(prompt, 'spark');
  }
}
