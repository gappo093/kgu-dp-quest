// KGU DP QUEST - コンテンツ定義
// 画面ロジック（js/*.js）はこのファイルの文言を参照するだけにし、
// 文章の追加・修正はこのファイルの編集だけで完結させる（13.2 コンテンツと実装の分離方針）。

export const content = {
  top: {
    title: 'KGU DP QUEST',
    subtitle: '4つの力を集めて、未来を切り拓こう。',
    introMessage: [
      '大学では、専門知識を覚えるだけではありません。',
      'これから4つのMISSIONに挑戦してもらいます。',
      'すべてクリアしたとき、大学で身につけるべき『4つの力』が見えてきます。',
    ],
    startButton: 'QUEST START',
    continueButton: '続きから',
    restartButton: 'はじめから',
    restartConfirm: 'これまでの進行状況を消去して、最初からやり直しますか？',
  },

  gradeSelect: {
    title: 'はじめに、学年を教えてください',
    intro: [
      '臨海市でのMissionは全学年共通ですが、学年によって求められる判断の深さが少し変わります。',
      '該当しない方（オープンキャンパス参加者・保護者・教職員の方など）は選ばなくても進められます。',
    ],
    options: [
      { value: 1, label: '1年生' },
      { value: 2, label: '2年生' },
      { value: 3, label: '3年生' },
      { value: 4, label: '4年生' },
    ],
    skipLabel: '選ばずに進む',
    confirmButton: '次へ',
  },

  survey: {
    title: 'DP理解度チェック',
    common: {
      q1: {
        name: '認知',
        question: 'ディプロマ・ポリシー（DP）という言葉を知っていますか？',
        choices: ['知っている', '聞いたことがある', '知らない'],
      },
      q2: {
        name: '理解',
        question: 'DPとは何を示すものだと思いますか？',
        placeholder: '自由に書いてください（わからなければ「わからない」でも構いません）',
      },
      q4: {
        name: '自己認識',
        question: '自分が大学で何の力を身につけようとしているか、説明できますか？',
        choices: ['はい', 'なんとなく', 'いいえ'],
      },
    },
    pre: {
      intro: [
        'これから4つのMissionに挑戦してもらう前に、簡単な質問に答えてください。',
        '正解・不正解はありません。今の自分の感覚のままで答えてください。',
      ],
      q3: {
        name: '適用',
        question:
          '複数の立場から社会課題を考えることは、次のうちどの学びに最も強く関係すると思いますか？最も当てはまるものを1つ選んでください。',
        choices: [
          '知識や技能を使って問題を解決すること',
          '異なる立場や背景を踏まえて物事を見ること',
          'データや情報をもとに原因を考え、説明すること',
          '多様な人と協力しながら行動すること',
        ],
      },
      button: '次へ',
    },
    post: {
      intro: [
        'Missionを始める前にも、同じような質問に答えてもらいました。',
        'すべて終えた今、どう変わったか、もう一度答えてみましょう。',
      ],
      q3: {
        name: '適用',
        question:
          '複数の立場から社会課題を考えることは、Know/See/Think/Actのどれと最も強く関係すると思いますか？最も当てはまるものを1つ選んでください。',
        choices: ['Know', 'See', 'Think', 'Act'],
      },
      button: '次へ',
    },
  },

  stage1: {
    missionTitle: 'MISSION 1：まず、知識を使ってみよう',
    introLines: [
      'あなたは臨海市役所 土木課に配属されたばかりの新人職員です。',
      '上司から「青葉橋は少し前の点検で老朽化が指摘されている。まずは基本を確認しておこう」と言われ、担当する青葉橋について3つの質問を渡されました。',
    ],
    questions: [
      {
        question: '橋の上を自動車や人が通る部分を何と呼ぶ？',
        choices: ['橋脚', '床版', '支承', '基礎'],
        correctIndex: 1,
      },
      {
        question: '豪雨などによる浸水や土砂災害の危険性を、あらかじめ地図で確認できる資料を何という？',
        choices: ['ハザードマップ', '路線図', '航空写真', '地番図'],
        correctIndex: 0,
      },
      {
        question: '橋を定期的に目視や機器で確認し、異常がないかを調べることを何という？',
        choices: ['点検', '設計', '撤去', '造成'],
        correctIndex: 0,
      },
    ],
    correctFeedback: '正解！',
    incorrectFeedbackPrefix: '不正解。正解は「',
    incorrectFeedbackSuffix: '」',
    nextQuestionButton: '次の問題へ',
    resultButton: '結果を見る',
    // 3問中の正解数に応じて結果を出し分ける。
    //   3問正解 → badgeTitle/badgeExplainのみ（達成）
    //   2問正解 → 上記に加えてalmostMessageを表示（達成、励ましを添える）
    //   0〜1問正解 → notAchievedTitle/notAchievedMessageを表示し、バッジは保留（再挑戦を促す）
    almostMessage: 'おしい！もう一歩で全問正解でした。',
    badgeLabel: 'Know',
    badgeTitle: 'Know ―『知る力』を達成しました',
    badgeExplain: [
      '今あなたは、持っている知識や技能を使って問題を解きました。',
      '大学では、専門分野を理解し、必要な知識や技能を身につけます。',
      'これが Know の力です。',
    ],
    notAchievedTitle: 'まだ達成できませんでした',
    notAchievedMessage: [
      '知識を使って問題を解くのは、今日が初めての人も多いはず。',
      'もう一度、3つの問題に挑戦してみましょう。',
    ],
    retryButton: 'もう一度挑戦する',
    nextButton: '次へ',
  },

  stage2: {
    missionTitle: 'MISSION 2：一つの答えだけを見ない',
    introLead:
      '大型の台風が接近しています。臨海川の水位が上昇し始め、あなたは避難指示を出すかどうかの判断を任されました。',
    scenarioFacts: [
      '過去に避難指示を出したが、大きな被害が出なかったことがある（「空振り」への不信感がある）',
      '夜間に避難指示を出すと、避難行動そのものが危険になることもある',
      '高齢者や障害のある人などの要配慮者は、早めの避難が必要',
      '指示が遅れれば、逃げ遅れて命に関わるおそれがある',
      '早すぎる・多すぎる指示は、住民の「またか」という気持ちにつながることもある',
    ],
    introButton: '次へ',
    question: 'あなたが自治体の担当者ならどうする？',
    choices: [
      {
        label: '今すぐ全域に避難指示を出す',
        followUp:
          '安全性を重視した判断です。では、これまでの「空振り」の経験がある中で、今回も住民に本当に避難してもらえるでしょうか？',
      },
      {
        label: '要配慮者エリアだけ先に避難指示を出す',
        followUp:
          '優先順位を意識した判断です。では、対象を絞ったことで、それ以外の地域の住民が「自分は大丈夫」と油断してしまわないでしょうか？',
      },
      {
        label: 'もう少し様子を見てから判断する',
        followUp: '慎重な判断です。では、様子を見ている間に状況が悪化し、避難そのものが手遅れになる可能性はないでしょうか？',
      },
      {
        label: '気象台や河川管理者に確認してから判断する',
        followUp: '情報を踏まえた判断です。では、確認している間にも水位は上昇し続けています。その時間差はどう考えますか？',
      },
    ],
    round1NextButton: '地域の声を聞く',
    residentCharacterName: '高齢者施設 職員',
    residentCharacterRole: '要配慮者の避難を、限られた人手で担っている。',
    residentDialogue: [
      '「早めに情報をもらえると、余裕を持って避難できるので助かります。」',
      '「でも……空振りのたびに入所者を避難させるのは、正直、体力的にも大変なんです。」',
    ],
    residentNextButton: 'もう一度考える',
    round2Lead: '別の視点も踏まえて、もう一度考えてみましょう。',
    round2Question: 'あなたなら、最終的にどうする？',
    round2Closing:
      '防災の判断には、早すぎる・多すぎるリスクと、遅すぎるリスクの両方があります。どちらを重く見るかは、誰の立場に立つかで変わります。',
    round2ClosingAdvanced:
      '空振りを恐れて判断が遅れれば、人命に関わることがあります。逆に、空振りを重ねれば、次第に指示そのものが信頼されなくなるおそれもあります。判断する立場になったとき大切なのは、その両方のリスクを住民に隠さず伝え続ける姿勢です。',
    round2NextButton: '次へ',
    badgeLabel: 'See',
    badgeTitle: 'See ―『みる力』を達成しました',
    badgeExplain: [
      '社会の問題には、一つの正解しか存在しないとは限りません。',
      '他者の立場や社会的背景を含めて物事を見る。',
      'これが See の力です。',
    ],
    nextButton: '次へ',
  },

  stage3: {
    missionTitle: 'MISSION 3：データから原因を突き止めろ',
    alertLines: [
      '臨海市郊外の住宅地・望洋台。',
      '造成地の斜面に設置された傾斜計（斜面の傾きの変化を測る機器）から、',
      '「斜面の傾きが昨日より大きく変化した」というデータが届きました。',
    ],
    step1Question: 'この変化の原因として、まず何が考えられるでしょうか？',
    causeChoices: ['地盤が崩れ始めている', '大雨による一時的な地下水位の変化', 'センサーの異常', 'その他'],
    step1NextButton: '追加情報を見る',
    step2Lead: '判断する前に、追加情報を確認しましょう。4枚すべてを開くと、次に進めます。',
    infoCards: [
      {
        title: '降水量データ',
        body: 'この2日間、臨海市では平年の3倍近い雨が降り続いています。大雨は地盤の中の水位を一時的に押し上げ、傾斜計の値がわずかに変化することがあります。',
      },
      {
        title: '過去の変位記録',
        body: 'この斜面では、過去に同程度の大雨が降った際にも、同じように傾斜計の値が一時的に変化し、雨が止んで数日たつと元の値に戻るというパターンが繰り返し記録されています。',
      },
      {
        title: '周辺センサー',
        body: '同じ大雨の中、望洋台周辺の別の斜面に設置された、別メーカー・別個体のセンサーでも、同じ時期に同程度の変化が観測されています。1台の機器だけが故障してこれほど広い範囲で同じ動きになるとは考えにくいといえます。',
      },
      {
        title: '点検記録',
        body: '直近の点検（3週間前）に加え、今回の通報を受けての現地確認でも、地割れや地面の沈下といった、実際に斜面が崩れ始めている場合に見られる兆候は確認されていません。',
      },
    ],
    step2NextButton: 'もう一度判断する',
    step2LeadBasic: '判断する前に、追加情報を確認しましょう。2枚以上を開くと、次に進めます。',
    step2BasicRequiredCount: 2,
    step3Lead: '集めた情報を踏まえて、もう一度考えてみましょう。',
    step1AnswerReminderPrefix: 'STEP1でのあなたの予想：「',
    step1AnswerReminderSuffix: '」',
    step3Question: 'この変化の原因として、あなたはどう判断しますか？',
    step3Closing: 'データと情報をもとに判断を下しました。次は、その判断を他の人に説明する番です。',
    step3ClosingAdvanced:
      'データだけで原因を断定するのは危険です。専門家は、複数の仮説を残したまま追加調査を提案したり、判断に残る不確実性そのものを関係者に伝えたりすることもあります。',
    step3NextButton: '次へ',
    badgeLabel: 'Think',
    badgeTitle: 'Think ―『考える力』を達成しました',
    badgeExplain: [
      '知識やデータを使って問題を発見し、原因を考え、解決策を導く。',
      'さらに、その考えを他者に説明する。',
      'これが Think の力です。',
    ],
    nextButton: '次へ',
  },

  stage4: {
    missionTitle: 'FINAL MISSION：災害発生！',
    briefingLines: [
      '大規模な地震が発生しました。',
      '臨海市内では、橋・道路・斜面・堤防など、複数の場所で被害が報告されています。',
      'しかし、技術者・点検車両・予算・時間は限られています。',
    ],
    characters: {
      contractor: { name: '建設会社', role: '点検車両や技術者、応急対応の人手を持つ。' },
      researcher: { name: '大学研究者', role: '構造・地盤の専門的な診断ができる。' },
      fire: { name: '消防', role: '救助や周辺の安全確保が専門。' },
      police: { name: '警察', role: '交通規制や避難誘導が専門。' },
      residents: { name: '地域住民', role: '臨海市の暮らしの中で、不安や要望を持つ。' },
    },
    contactNextButton: '次へ',
    recapTitle: '今回、協力してくれた人たち',
    startNode: 'phaseA-question',
    nodes: {
      'phaseA-question': {
        type: 'decision',
        question: '地震により、臨海市内では複数の場所で被害が報告されています。どこから対応する？',
        choices: [
          { label: '青葉橋（橋梁の損傷）', outcome: 'phaseA-blocked-bridge' },
          { label: '望洋台の斜面（土砂崩れの危険）', outcome: 'phaseA-blocked-slope' },
          { label: '臨海川の堤防（損傷）', outcome: 'phaseA-blocked-levee' },
          { label: '市街地の道路（陥没）', outcome: 'phaseA-blocked-road' },
        ],
      },
      'phaseA-blocked-bridge': {
        type: 'blocked',
        message:
          '老朽化が指摘されていた青葉橋は特に注意が必要です。ただし、これまでの老朽化の経緯や過去の点検記録は、実際に工事や点検を担当してきた業者でなければ詳しく把握できません。あなた一人の手元にある資料だけでは、経緯をたどりきれません。',
        contact: { character: 'contractor', label: '建設会社に相談する', outcome: 'phaseA-contact-bridge' },
      },
      'phaseA-blocked-slope': {
        type: 'blocked',
        message:
          '地震の揺れで、望洋台の斜面に新たな亀裂が見つかったという通報が入っています。土砂災害の危険度を正しく評価するには、地質データや専門的な調査機材を持つ業者の協力が必要です。あなた一人の判断では、危険度を判断できません。',
        contact: { character: 'contractor', label: '建設会社に相談する', outcome: 'phaseA-contact-slope' },
      },
      'phaseA-blocked-levee': {
        type: 'blocked',
        message:
          '地震の揺れで、臨海川の堤防の一部にひび割れが見つかったという通報が入っています。堤防の強度を正しく評価するには、専門の技術者による詳しい調査が必要です。あなた一人の判断では、決壊の危険度を判断できません。',
        contact: { character: 'contractor', label: '建設会社に相談する', outcome: 'phaseA-contact-levee' },
      },
      'phaseA-blocked-road': {
        type: 'blocked',
        message:
          '市街地の道路では、陥没が複数の場所で報告されています。少しずつ全ての場所を自分だけで回ろうとすると、どこも十分な調査ができません。効率よく調べるには、複数の班で動ける業者の協力が必要です。',
        contact: { character: 'contractor', label: '建設会社に相談する', outcome: 'phaseA-contact-road' },
      },
      'phaseA-contact-bridge': {
        type: 'contact',
        character: 'contractor',
        dialogue: [
          '「うちから点検車両と技術者を2班出せます。」',
          '「青葉橋はうちが過去に点検を担当していたので、老朽化の経緯や記録も残っていますよ。」',
          '「これで経緯を踏まえて点検できますね。」',
        ],
        outcome: 'phaseB-question-bridge',
      },
      'phaseA-contact-slope': {
        type: 'contact',
        character: 'contractor',
        dialogue: [
          '「望洋台なら、うちの地盤調査チームを向かわせられます。」',
          '「以前、傾斜計のデータも一緒に確認していたので、変化の経緯もすぐに分かるはずです。」',
        ],
        outcome: 'phaseB-question-slope',
      },
      'phaseA-contact-levee': {
        type: 'contact',
        character: 'contractor',
        dialogue: ['「堤防の点検チームを向かわせます。」', '「以前の点検記録も踏まえて、状況を確認しますね。」'],
        outcome: 'phaseB-question-levee',
      },
      'phaseA-contact-road': {
        type: 'contact',
        character: 'contractor',
        dialogue: [
          '「道路の陥没箇所を調べる班を、複数出せます。」',
          '「危険度の高い場所から順に、手分けして対応しましょう。」',
        ],
        outcome: 'phaseB-question-road',
      },

      'phaseB-question-bridge': {
        type: 'decision',
        question: '点検の結果、青葉橋の支承部に気になるひびが見つかりました。誰に協力を依頼する？',
        choices: [
          { label: '自分の判断だけで安全性を決める', outcome: 'phaseB-blocked-self-bridge' },
          { label: '消防に相談する', outcome: 'phaseB-blocked-fire-bridge' },
          { label: '警察に相談する', outcome: 'phaseB-blocked-police-bridge' },
          { label: '大学研究者に相談する', outcome: 'phaseB-contact-bridge' },
        ],
      },
      'phaseB-blocked-self-bridge': {
        type: 'blocked',
        message: '構造的な安全性の判断には専門的な知識が必要です。自治体職員だけの判断では、住民の安全を保証できません。',
        contact: { character: 'researcher', label: '大学研究者に相談する', outcome: 'phaseB-contact-bridge' },
      },
      'phaseB-blocked-fire-bridge': {
        type: 'blocked',
        message: '消防は救助や周辺の安全確保が専門で、構造そのものの診断はできません。',
        contact: { character: 'researcher', label: '大学研究者に相談する', outcome: 'phaseB-contact-bridge' },
      },
      'phaseB-blocked-police-bridge': {
        type: 'blocked',
        message: '警察は交通規制や避難誘導が専門で、構造そのものの診断はできません。',
        contact: { character: 'researcher', label: '大学研究者に相談する', outcome: 'phaseB-contact-bridge' },
      },
      'phaseB-contact-bridge': {
        type: 'contact',
        character: 'researcher',
        dialogue: [
          '「支承部のひびを確認しました。すぐに崩落するような状態ではありませんが、」',
          '「片側車線を規制した上での使用が望ましいですね。」',
        ],
        outcome: 'phaseC-question',
      },

      'phaseB-question-slope': {
        type: 'decision',
        question: '調査の結果、望洋台の斜面で地割れが拡大していることが分かりました。誰に協力を依頼する？',
        choices: [
          { label: '自分の判断だけで安全性を決める', outcome: 'phaseB-blocked-self-slope' },
          { label: '消防に相談する', outcome: 'phaseB-blocked-fire-slope' },
          { label: '警察に相談する', outcome: 'phaseB-blocked-police-slope' },
          { label: '大学研究者に相談する', outcome: 'phaseB-contact-slope' },
        ],
      },
      'phaseB-blocked-self-slope': {
        type: 'blocked',
        message: '地盤や斜面の安全性の判断には専門的な知識が必要です。自治体職員だけの判断では、住民の安全を保証できません。',
        contact: { character: 'researcher', label: '大学研究者に相談する', outcome: 'phaseB-contact-slope' },
      },
      'phaseB-blocked-fire-slope': {
        type: 'blocked',
        message: '消防は救助や周辺の安全確保が専門で、地盤そのものの診断はできません。',
        contact: { character: 'researcher', label: '大学研究者に相談する', outcome: 'phaseB-contact-slope' },
      },
      'phaseB-blocked-police-slope': {
        type: 'blocked',
        message: '警察は交通規制や避難誘導が専門で、地盤そのものの診断はできません。',
        contact: { character: 'researcher', label: '大学研究者に相談する', outcome: 'phaseB-contact-slope' },
      },
      'phaseB-contact-slope': {
        type: 'contact',
        character: 'researcher',
        dialogue: [
          '「地割れの拡大を確認しました。すぐに崩れるような状態ではありませんが、」',
          '「大雨が降る前に、周辺への立入を制限した方がよいでしょう。」',
        ],
        outcome: 'phaseC-question',
      },

      'phaseB-question-levee': {
        type: 'decision',
        question: '点検の結果、臨海川の堤防にひび割れと沈下が見つかりました。誰に協力を依頼する？',
        choices: [
          { label: '自分の判断だけで安全性を決める', outcome: 'phaseB-blocked-self-levee' },
          { label: '消防に相談する', outcome: 'phaseB-blocked-fire-levee' },
          { label: '警察に相談する', outcome: 'phaseB-blocked-police-levee' },
          { label: '大学研究者に相談する', outcome: 'phaseB-contact-levee' },
        ],
      },
      'phaseB-blocked-self-levee': {
        type: 'blocked',
        message: '堤防の安全性の判断には専門的な知識が必要です。自治体職員だけの判断では、住民の安全を保証できません。',
        contact: { character: 'researcher', label: '大学研究者に相談する', outcome: 'phaseB-contact-levee' },
      },
      'phaseB-blocked-fire-levee': {
        type: 'blocked',
        message: '消防は救助や周辺の安全確保が専門で、堤防そのものの診断はできません。',
        contact: { character: 'researcher', label: '大学研究者に相談する', outcome: 'phaseB-contact-levee' },
      },
      'phaseB-blocked-police-levee': {
        type: 'blocked',
        message: '警察は交通規制や避難誘導が専門で、堤防そのものの診断はできません。',
        contact: { character: 'researcher', label: '大学研究者に相談する', outcome: 'phaseB-contact-levee' },
      },
      'phaseB-contact-levee': {
        type: 'contact',
        character: 'researcher',
        dialogue: [
          '「ひび割れと沈下を確認しました。すぐに決壊するような状態ではありませんが、」',
          '「大雨が続くと危険性が高まります。早めの補強が必要です。」',
        ],
        outcome: 'phaseC-question',
      },

      'phaseB-question-road': {
        type: 'decision',
        question: '点検の結果、通学路にもなっている道路で大きな陥没が見つかりました。誰に協力を依頼する？',
        choices: [
          { label: '自分の判断だけで安全性を決める', outcome: 'phaseB-blocked-self-road' },
          { label: '消防に相談する', outcome: 'phaseB-blocked-fire-road' },
          { label: '警察に相談する', outcome: 'phaseB-blocked-police-road' },
          { label: '大学研究者に相談する', outcome: 'phaseB-contact-road' },
        ],
      },
      'phaseB-blocked-self-road': {
        type: 'blocked',
        message: '路面や地盤の安全性の判断には専門的な知識が必要です。自治体職員だけの判断では、住民の安全を保証できません。',
        contact: { character: 'researcher', label: '大学研究者に相談する', outcome: 'phaseB-contact-road' },
      },
      'phaseB-blocked-fire-road': {
        type: 'blocked',
        message: '消防は救助や周辺の安全確保が専門で、路面そのものの診断はできません。',
        contact: { character: 'researcher', label: '大学研究者に相談する', outcome: 'phaseB-contact-road' },
      },
      'phaseB-blocked-police-road': {
        type: 'blocked',
        message: '警察は交通規制や避難誘導が専門で、路面そのものの診断はできません。',
        contact: { character: 'researcher', label: '大学研究者に相談する', outcome: 'phaseB-contact-road' },
      },
      'phaseB-contact-road': {
        type: 'contact',
        character: 'researcher',
        dialogue: [
          '「陥没の状況を確認しました。すぐに道路が崩れるような状態ではありませんが、」',
          '「通行を制限した上での補修が必要です。」',
        ],
        outcome: 'phaseC-question',
      },

      'phaseC-contact-residents': {
        type: 'contact',
        character: 'residents',
        dialogue: [
          '「毎日ここを子どもが通学に使っているんです。」',
          '「高齢者施設の職員さんも、避難のタイミングをいつも心配していましたよ。」',
          '「使えなくなるなら、早めに教えてほしいです。」',
        ],
        outcome: 'phaseC-question',
      },
      'phaseC-question': {
        type: 'decision-neutral',
        question: '地域の住民にはどのように説明する？',
        optionalContact: {
          character: 'residents',
          label: '先に地域住民の声を聞く',
          targetNodeId: 'phaseC-contact-residents',
        },
        choices: [
          { label: '通行止めだけを伝える' },
          { label: '専門家の診断結果と対応方針を含めて説明する' },
          { label: '心配させないよう安全だとだけ伝える' },
          { label: '住民の意見を聞く場を設けてから方針を説明する' },
        ],
        closing: '一人だけの判断では、ここまでの情報も対応も揃いませんでした。',
        closingConsulted:
          '地域住民の声を聞いたことで、判断にも説明にも厚みが加わりました。それでも、実際にどう伝わるかは、住民の反応を見ながら確認していく必要があります。',
        outcome: 'badge',
      },

      badge: { type: 'badge' },
    },
    phaseCClosingAdvanced:
      'ここまでの判断は、複数の専門家の意見を踏まえたものです。ただし、地域住民が本当に納得できるかどうかは、説明の仕方次第で大きく変わります。伝え方にも、技術と同じくらいの責任があります。',
    badgeLabel: 'Act',
    badgeTitle: 'Act ―『働きかける力』を達成しました',
    badgeExplain: [
      '社会の問題は、一人だけでは解決できません。',
      '自ら行動し、多様な人と協力しながら社会に働きかける。',
      'これが Act の力です。',
    ],
    nextButton: '次へ',
  },

  complete: {
    badgeNames: { know: 'Know', see: 'See', think: 'Think', act: 'Act' },
    badgeScreenTitle: 'QUEST COMPLETE!',
    reflect: {
      title: 'ここで終わりではありません',
      intro: [
        '4つのMissionをクリアしました。',
        'あなたはMissionを通して、どんな力を使ったと思いますか？',
      ],
      selectLabel: '当てはまると思うものを選んでください（いくつでも）',
      options: [
        '知識や技能を使って問題を解決する力',
        '異なる立場や背景を踏まえて物事を見る力',
        'データや情報をもとに原因を考え、説明する力',
        '多様な人と協力しながら行動する力',
      ],
      textLabel: 'よければ、なぜそう思ったか、自分の言葉で書いてみましょう。（任意）',
      textPlaceholder: '自由に書いてください',
      nextButton: '次へ',
    },
    revealLines: ['実は、あなたが体験したこの4つの力が、', '関東学院大学のDiploma Policy（DP）', 'です。'],
    dpTableIntro: 'DPとは、関東学院大学を卒業するときに身につけていてほしい能力を示したものです。',
    dpMapping: [
      { from: 'Know', to: 'DP1 知る／知識・技能' },
      { from: 'See', to: 'DP2 みる／寛容さ・判断力' },
      { from: 'Think', to: 'DP3 考える／思考力・表現力' },
      { from: 'Act', to: 'DP4 働きかける／主体性・協働性' },
    ],
    dpDefinition:
      '関東学院大学は、教育研究上の目的のもとに掲げるこの4つの力を備え、所定の単位を修得した学生に学位を授与します。これが「ディプロマ・ポリシー（学位授与の方針）」です。',
    nextButton: '次へ',
  },

  status: {
    formTitle: 'MY DP STATUS',
    formIntro: '最後に、簡単な自己評価をしてみましょう。それぞれ5段階で回答してください。',
    guideTitle: '回答の目安',
    guide: [
      { value: 1, text: 'まだよく分からない・経験したことがない' },
      { value: 2, text: '説明や助けがあればできる' },
      { value: 3, text: '基本的な場面なら自分でできる' },
      { value: 4, text: '複雑な場面でも自分で考えてできる' },
      { value: 5, text: '他者と協力したり、他者に説明したりしながら応用できる' },
    ],
    items: [
      { key: 'know', name: 'Know', label: '専門知識を使って問題を考えることができる' },
      { key: 'see', name: 'See', label: '異なる立場の人の意見を考えることができる' },
      { key: 'think', name: 'Think', label: 'データや情報をもとに、原因を考えて説明できる' },
      { key: 'act', name: 'Act', label: '多様な人と協力しながら、自ら行動できる' },
    ],
    scaleMin: 1,
    scaleMax: 5,
    submitButton: '結果を見る',
    resultsTitle: 'MY DP STATUS',
    levelPrefix: 'Lv.',
    disclaimer: 'これは能力の優劣を判定するテストではなく、自分の現在地を振り返るためのものです。',
    nextButton: '次へ',
  },

  recap: {
    title: 'あなたの振り返り',
    disclaimer: 'これは評価ではなく、自分の変化を振り返るためのものです。',
    surveySectionTitle: 'DP理解度チェックの変化',
    preLabel: '最初の回答',
    postLabel: '今の回答',
    reflectSectionTitle: 'あなたが選んだ力',
    reflectTextIntro: 'あなたはこう書きました：',
    // complete.reflect.optionsと同じ並び順（Know→See→Think→Actの順）で対応させる。
    reflectPowers: ['Know', 'See', 'Think', 'Act'],
    nextButton: '次へ',
  },

  nextQuest: {
    endTitle: 'YOUR NEXT QUEST',
    intro: 'この4つの力は、これから大学のさまざまな授業で身につけていきます。',
    gradeLabel: '学年を選んでください',
    gradePlaceholder: '学年を選択（任意）',
    gradeOptions: [
      { value: 1, label: '1年生' },
      { value: 2, label: '2年生' },
      { value: 3, label: '3年生' },
      { value: 4, label: '4年生' },
    ],
    courseLabel: '土木・都市防災コースの場合',
    subjectGroups: [
      {
        subjects: '測量学・構造力学・地盤工学・水理学',
        dpFocus: 'Know中心',
        minYear: 1,
        maxYear: 2,
        yearLabel: '1〜2年次',
      },
      {
        subjects: '土木工学総論',
        dpFocus: 'Know・See・Act',
        minYear: 3,
        maxYear: 3,
        yearLabel: '3年次',
      },
      {
        subjects: '専門展開科目（防災系／建設系／環境系）',
        dpFocus: 'Know・See・Act中心',
        minYear: 3,
        maxYear: 3,
        yearLabel: '3年次',
      },
      {
        subjects: '卒業研究',
        dpFocus: 'See・Think・Act中心',
        minYear: 4,
        maxYear: 4,
        yearLabel: '4年次',
      },
    ],
    pastSectionTitle: 'すでに通ってきた科目',
    upcomingSectionTitle: 'これから履修する科目',
    futureNote: '将来的には、学部・学科ごとの科目マップに発展させる予定です。',
    finishButton: 'QUESTを終える',
  },

  // YOUR NEXT QUESTから独立したエンディング画面（spec doc 11.4）。
  // 「これから何を学ぶか」の案内（nextQuest）と「体験の締めくくり」を1画面で
  // 兼ねていたことで終了地点が分かりにくいという指摘を受け、分離した。
  ending: {
    title: 'KGU DP QUEST',
    message: [
      'ここでDPについて学ぶ体験は終了です。',
      'KGU DP QUESTにご参加いただき、ありがとうございました。',
    ],
    restartButton: 'はじめから',
    restartConfirm: 'これまでの進行状況を消去して、最初からやり直しますか？',
  },
};
