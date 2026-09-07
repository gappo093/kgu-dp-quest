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
        question: '複数の立場から社会課題を考えることは、次のうちどの学びに最も関係すると思いますか？',
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
        question: '複数の立場から社会課題を考えることは、Know/See/Think/Actのどれと最も関係すると思いますか？',
        choices: ['Know', 'See', 'Think', 'Act'],
      },
      button: '次へ',
      compareTitle: '最初の回答と、今の回答を比べてみましょう',
      preLabel: '最初の回答',
      postLabel: '今の回答',
      compareButton: '次へ',
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
    badgeLabel: 'Know',
    badgeTitle: 'Know ―『知る力』を達成しました',
    badgeExplain: [
      '今あなたは、持っている知識や技能を使って問題を解きました。',
      '大学では、専門分野を理解し、必要な知識や技能を身につけます。',
      'これが Know の力です。',
    ],
    nextButton: '次へ',
  },

  stage2: {
    missionTitle: 'MISSION 2：一つの答えだけを見ない',
    introLead: '次にあなたが向かったのは、臨海川沿いの堤防です。この堤防は築60年を迎え、老朽化が進んでいます。',
    scenarioFacts: [
      '堤防の上は地域の生活道路として使われている',
      '沿岸には長年続く農地や店が並ぶ',
      '自治体の予算は限られている',
      '補強という選択肢もある',
      '大雨や高潮の際には浸水を防ぐ最後の砦になる',
    ],
    introButton: '次へ',
    question: 'あなたが自治体の担当者ならどうする？',
    choices: [
      {
        label: 'すぐに堤防を造り替える',
        followUp: '安全性を重視した判断です。では、造り替え期間中、堤防沿いの道は使えなくなります。地域住民の暮らしはどうなるでしょう？',
      },
      {
        label: '補強して使用する',
        followUp: '予算を踏まえた現実的な判断です。では、補強だけで今後何十年も大雨や高潮に耐えられるでしょうか？',
      },
      {
        label: '危険区域として立入を制限する',
        followUp: '安全を最優先した判断です。では、堤防沿いの道が使えなくなると、地域の暮らしや農業にはどんな影響が出るでしょうか？',
      },
      {
        label: '追加調査を行う',
        followUp: '慎重な判断です。では、調査をしている間も老朽化は進みます。その間の安全はどう確保しますか？',
      },
    ],
    round1NextButton: '地域の声を聞く',
    residentCharacterName: '臨海川沿い 農家の女性',
    residentCharacterRole: '堤防のすぐそばで、代々この土地で農業を営んでいる。',
    residentDialogue: [
      '「この堤防のおかげで、何十年もここで畑を続けてこられたんです。」',
      '「でも……大雨のたびに『今年は大丈夫か』って、正直不安なんですよ。」',
    ],
    residentNextButton: 'もう一度考える',
    round2Lead: '別の視点も踏まえて、もう一度考えてみましょう。',
    round2Question: 'あなたなら、最終的にどうする？',
    round2Closing: '社会の問題には、一つの正解があるとは限りません。誰の立場に立つかによって、見え方は変わります。',
    round2NextButton: '次へ',
    advancedExplain: {
      label: 'あなたの判断を、地域住民にどう説明しますか？理由も含めて書いてみましょう。',
      placeholder: '自由に書いてください',
      button: '次へ',
    },
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
      '造成地の斜面に設置された傾斜計から、',
      '「斜面の傾きが昨日より大きく変化した」というデータが届きました。',
    ],
    step1Question: 'この変化の原因として、まず何が考えられるでしょうか？',
    causeChoices: ['地盤が崩れ始めている', '大雨による一時的な地下水位の変化', 'センサーの異常', 'その他'],
    step1NextButton: '追加情報を見る',
    step2Lead: '判断する前に、追加情報を確認しましょう。4枚すべてを開くと、次に進めます。',
    infoCards: [
      {
        title: '降水量データ',
        body: 'この2日間、臨海市では平年の3倍近い雨が降り続いています。大雨は地盤の中の水位を一時的に押し上げることがあります。',
      },
      {
        title: '過去の変位記録',
        body: 'この斜面では、過去にも大雨のたびに傾斜計がわずかな変化を記録し、雨が止むと元の値に戻ってきました。',
      },
      {
        title: '周辺センサー',
        body: '同じ地域にある別の斜面のセンサーでも、同じ時期にわずかな変化が観測されています。',
      },
      {
        title: '点検記録',
        body: '直近の点検（3週間前）では、地割れや崩壊の兆候は確認されていません。次回の定期点検は来月に予定されています。',
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
    step3NextButton: '次へ',
    advancedExplain: {
      label: 'あなたの判断を、どう説明しますか？理由も含めて書いてみましょう。',
      placeholder: '自由に書いてください',
      button: '次へ',
    },
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
      '臨海市内の複数の橋梁で被害が報告されています。青葉橋も例外ではありません。',
      'しかし、技術者・点検車両・予算・時間は限られています。',
    ],
    characters: {
      contractor: { name: '建設会社', role: '点検車両や技術者、応急対応の人手を持つ。' },
      researcher: { name: '大学研究者', role: '構造の専門的な診断ができる。' },
      fire: { name: '消防', role: '救助や周辺の安全確保が専門。' },
      police: { name: '警察', role: '交通規制や避難誘導が専門。' },
      residents: { name: '地域住民', role: '橋を日常的に利用し、不安や要望を持つ。' },
    },
    contactNextButton: '次へ',
    recapTitle: '今回、協力してくれた人たち',
    startNode: 'phaseA-question',
    nodes: {
      'phaseA-question': {
        type: 'decision',
        question: 'どの橋から点検する？',
        choices: [
          { label: '港北橋（最も被害が大きそうな橋）', outcome: 'phaseA-blocked-a' },
          { label: '旭橋（最も利用者が多い橋）', outcome: 'phaseA-blocked-b' },
          { label: '青葉橋（過去に老朽化が指摘されていた橋）', outcome: 'phaseA-blocked-c' },
          { label: '少しずつ全ての橋を点検する', outcome: 'phaseA-blocked-d' },
        ],
      },
      'phaseA-blocked-a': {
        type: 'blocked',
        message:
          '被害が大きい港北橋ほど詳しい調査に時間がかかります。今の人員と車両だけでは、あなた一人で点検を終えられません。',
        contact: { character: 'contractor', label: '建設会社に相談する', outcome: 'phaseA-contact' },
      },
      'phaseA-blocked-b': {
        type: 'blocked',
        message:
          '利用者が多い旭橋を優先するのは合理的な考え方です。ただし点検車両が1台しかなく、あなた一人では他の橋の点検が手つかずになります。',
        contact: { character: 'contractor', label: '建設会社に相談する', outcome: 'phaseA-contact' },
      },
      'phaseA-blocked-c': {
        type: 'blocked',
        message:
          '老朽化が指摘されていた青葉橋は特に注意が必要です。ただし、これまでの老朽化の経緯や過去の点検記録は、実際に工事や点検を担当してきた業者でなければ詳しく把握できません。あなた一人の手元にある資料だけでは、経緯をたどりきれません。',
        contact: { character: 'contractor', label: '建設会社に相談する', outcome: 'phaseA-contact' },
      },
      'phaseA-blocked-d': {
        type: 'blocked',
        message: '限られた時間と人員ですべての橋を回ろうとすると、どの橋も十分な点検ができません。',
        contact: { character: 'contractor', label: '建設会社に相談する', outcome: 'phaseA-contact' },
      },
      'phaseA-contact': {
        type: 'contact',
        character: 'contractor',
        dialogue: [
          '「うちから点検車両と技術者を2班出せます。」',
          '「青葉橋はうちが過去に点検を担当していたので、老朽化の経緯や記録も残っていますよ。」',
          '「これで複数の橋を同時に、経緯を踏まえて点検できますね。」',
        ],
        outcome: 'phaseB-question',
      },

      'phaseB-question': {
        type: 'decision',
        question: '点検の結果、青葉橋の支承部に気になるひびが見つかりました。誰に協力を依頼する？',
        choices: [
          { label: '自分の判断だけで安全性を決める', outcome: 'phaseB-blocked-self' },
          { label: '消防に相談する', outcome: 'phaseB-blocked-fire' },
          { label: '警察に相談する', outcome: 'phaseB-blocked-police' },
          { label: '大学研究者に相談する', outcome: 'phaseB-contact' },
        ],
      },
      'phaseB-blocked-self': {
        type: 'blocked',
        message:
          '構造的な安全性の判断には専門的な知識が必要です。自治体職員だけの判断では、住民の安全を保証できません。',
        contact: { character: 'researcher', label: '大学研究者に相談する', outcome: 'phaseB-contact' },
      },
      'phaseB-blocked-fire': {
        type: 'blocked',
        message: '消防は救助や周辺の安全確保が専門で、構造そのものの診断はできません。',
        contact: { character: 'researcher', label: '大学研究者に相談する', outcome: 'phaseB-contact' },
      },
      'phaseB-blocked-police': {
        type: 'blocked',
        message: '警察は交通規制や避難誘導が専門で、構造そのものの診断はできません。',
        contact: { character: 'researcher', label: '大学研究者に相談する', outcome: 'phaseB-contact' },
      },
      'phaseB-contact': {
        type: 'contact',
        character: 'researcher',
        dialogue: [
          '「支承部のひびを確認しました。すぐに崩落するような状態ではありませんが、」',
          '「片側車線を規制した上での使用が望ましいですね。」',
        ],
        outcome: 'phaseC-question',
      },

      'phaseC-contact-residents': {
        type: 'contact',
        character: 'residents',
        dialogue: [
          '「毎日この橋を子どもが通学に使っているんです。」',
          '「臨海川の堤防のそばで農業をしている方も、川の増水のたびに心配していましたよ。」',
          '「通れなくなるなら、早めに教えてほしいです。」',
        ],
        outcome: 'phaseC-question',
      },
      'phaseC-question': {
        type: 'decision-neutral',
        question: '青葉橋の住民にはどのように説明する？',
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
        outcome: 'badge',
      },

      badge: { type: 'badge' },
    },
    advancedExplain: {
      label: 'あなたの判断を、住民にどう伝えますか？理由も含めて書いてみましょう。',
      placeholder: '自由に書いてください',
      button: '次へ',
    },
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
    reviewButton: 'QUESTを振り返る',
    restartButton: 'はじめから',
    restartConfirm: 'これまでの進行状況を消去して、最初からやり直しますか？',
  },
};
