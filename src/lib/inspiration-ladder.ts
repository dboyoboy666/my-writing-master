/**
 * 灵感阶梯交互系统
 * 当检测到学生卡壳（30秒无操作）时触发
 */

export class InspirationLadder {
  /**
   * Step 1: 方向指引 - 只给思路，不给句子
   */
  getStep1Guidance(context: string): string {
    const guidanceMap: { [key: string]: string[] } = {
      'environment': ['试试描写周围的环境氛围？', '当时的光线、温度、气味是怎样的？'],
      'emotion': ['能说说你当时的心情吗？', '这个瞬间给你带来了什么感受？'],
      'character': ['其他人在做什么？他们的表情如何？', '你能从他人的角度看看这件事吗？'],
      'detail': ['能否加入一些具体的动作描写？', '试着用五感来描述这个场景'],
      'dialogue': ['他们说了什么？语气是怎样的？', '对话中有什么特别的词或语气？'],
    };

    // 根据上下文智能推荐
    const keywords = context.toLowerCase();
    let suggestions: string[] = [];

    if (keywords.includes('环境') || keywords.includes('场景')) {
      suggestions = guidanceMap.environment;
    } else if (keywords.includes('心情') || keywords.includes('感受')) {
      suggestions = guidanceMap.emotion;
    } else if (keywords.includes('人') || keywords.includes('他')) {
      suggestions = guidanceMap.character;
    } else if (keywords.includes('动作') || keywords.includes('细节')) {
      suggestions = guidanceMap.detail;
    } else if (keywords.includes('说') || keywords.includes('对话')) {
      suggestions = guidanceMap.dialogue;
    } else {
      // 默认推荐
      suggestions = [
        '试试从环境描写入手？',
        '加入人物的内心独白如何？',
        '这个场景最打动你的细节是什么？',
      ];
    }

    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }

  /**
   * Step 2: 范例示范 - 给出"初阶 vs 高阶"对比
   */
  getStep2Examples(theme: string): { basic: string; advanced: string; type: string } {
    const examples = [
      {
        type: '环境描写',
        basic: '那天天气很好，阳光明媚。',
        advanced: '晨曦如金线般穿透云层，温柔地洒在青石板路上，空气中弥漫着泥土和花草的清新气息。',
      },
      {
        type: '情感表达',
        basic: '我很感动，眼泪流了下来。',
        advanced: '一股暖流从心底涌起，视线渐渐模糊，滚烫的泪水无声地滑过脸颊，那一刻，所有的委屈都化作了释然。',
      },
      {
        type: '动作描写',
        basic: '他跑过来，抱住了我。',
        advanced: '他三步并作两步冲过来，双臂紧紧环住我的肩膀，我能感受到他胸膛剧烈的起伏和急促的呼吸。',
      },
      {
        type: '心理描写',
        basic: '我很紧张，心跳很快。',
        advanced: '掌心渗出细密的汗珠，喉咙发紧，每一次心跳都像擂鼓般撞击着胸腔，思绪如乱麻般纠缠不清。',
      },
      {
        type: '对话描写',
        basic: '他说："我很高兴。"',
        advanced: '他的嘴角微微上扬，眼中闪烁着欣慰的光芒，声音里带着一丝不易察觉的哽咽："这一刻，我等了很久了。"',
      },
    ];

    // 根据主题选择相关例子
    const filtered = examples.filter(e =>
      theme.includes('情感') || theme.includes('心情') ?
        e.type.includes('情感') || e.type.includes('心理') :
      theme.includes('环境') || theme.includes('场景') ?
        e.type.includes('环境') :
        e.type.includes('动作') || e.type.includes('对话')
    );

    const example = filtered.length > 0 ? filtered[0] : examples[Math.floor(Math.random() * examples.length)];
    return example;
  }

  /**
   * Step 3: 深度解析 - 拆解高阶写法好在哪里
   */
  getStep3Analysis(exampleType: string): string {
    const analyses: { [key: string]: string } = {
      '环境描写': '高阶写法运用了"以景衬情"的手法，通过细腻的感官描写（视觉：晨曦如金线；嗅觉：泥土花草气息）营造氛围，让读者身临其境。',
      '情感表达': '避免了直接说"感动"，而是通过"暖流涌起"、"视线模糊"、"泪水滑落"等细节描写来表现，符合"展示而非告知"的写作原则。',
      '动作描写': '加入了"三步并作两步"、"紧紧环住"、"胸膛起伏"等具体动作和感受，让人物形象更加生动立体。',
      '心理描写': '用"掌心出汗"、"喉咙发紧"、"心跳如鼓"等身体反应来外化内心紧张，比直接说"我很紧张"更有感染力。',
      '对话描写': '结合了神态（嘴角上扬、眼中闪光）、语气（哽咽）和对话内容，多维度展现人物情感，避免了平淡的叙述。',
    };

    return analyses[exampleType] || '高阶写法通过多感官描写、细节刻画和修辞手法，让文字更有画面感和感染力。';
  }

  /**
   * 完整的灵感阶梯流程
   */
  getFullLadder(context: string, theme: string) {
    return {
      step1: this.getStep1Guidance(context),
      step2: this.getStep2Examples(theme),
      step3: this.getStep3Analysis(this.getStep2Examples(theme).type),
    };
  }
}
