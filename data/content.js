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
      // 「適用」設問（spec doc 6.2改訂）：他の3問（自己申告）と異なり客観的な知識確認。
      // Know/See/Think/Actそれぞれについて1問ずつ、計4問を全員・全学年に共通で出題する
      // （ランダム抽出はしない）。Preでは選択肢の名称を伏せ、Postで初めて名称を出す。
      applicationQuestions: [
        {
          dpKey: 'know',
          stemPre:
            '知識や技能を使って、社会課題について理解し考えることは、次のうちどれと最も強く関係すると思いますか？',
          stemPost:
            '知識や技能を使って、社会課題について理解し考えることは、Know/See/Think/Actのどれと最も強く関係すると思いますか？',
        },
        {
          dpKey: 'see',
          stemPre:
            '社会課題に関わる、多様な立場や背景を踏まえて物事を判断することは、次のうちどれと最も強く関係すると思いますか？',
          stemPost:
            '社会課題に関わる、多様な立場や背景を踏まえて物事を判断することは、Know/See/Think/Actのどれと最も強く関係すると思いますか？',
        },
        {
          dpKey: 'think',
          stemPre:
            '社会課題の解決に向けて、自ら道筋を立て、根拠を示しながら説明することは、次のうちどれと最も強く関係すると思いますか？',
          stemPost:
            '社会課題の解決に向けて、自ら道筋を立て、根拠を示しながら説明することは、Know/See/Think/Actのどれと最も強く関係すると思いますか？',
        },
        {
          dpKey: 'act',
          stemPre:
            '社会課題の解決に向けて、多様な人と協力しながら行動することは、次のうちどれと最も強く関係すると思いますか？',
          stemPost:
            '社会課題の解決に向けて、多様な人と協力しながら行動することは、Know/See/Think/Actのどれと最も強く関係すると思いますか？',
        },
      ],
      applicationChoicesPre: [
        { label: '知識や技能を使って問題を解決すること', dpKey: 'know' },
        { label: '異なる立場や背景を踏まえて物事を見ること', dpKey: 'see' },
        { label: 'データや情報をもとに筋道を立てて考え、説明すること', dpKey: 'think' },
        { label: '多様な人と協力しながら行動すること', dpKey: 'act' },
      ],
      applicationChoicesPost: [
        { label: 'Know', dpKey: 'know' },
        { label: 'See', dpKey: 'see' },
        { label: 'Think', dpKey: 'think' },
        { label: 'Act', dpKey: 'act' },
      ],
    },
    pre: {
      intro: [
        'これから4つのMissionに挑戦してもらう前に、簡単な質問に答えてください。',
        '正解・不正解はありません。今の自分の感覚のままで答えてください。',
      ],
      button: '次へ',
    },
    post: {
      intro: [
        'Missionを始める前にも、同じような質問に答えてもらいました。',
        'すべて終えた今、どう変わったか、もう一度答えてみましょう。',
      ],
      button: '次へ',
    },
  },

  stage1: {
    missionTitle: 'MISSION 1：まず、知識を使ってみよう',
    introLines: [
      'あなたは臨海市役所 土木課に配属されたばかりの新人職員です。',
      '上司から「青葉橋は少し前の点検で老朽化が指摘されている。まずは基本を確認しておこう」と言われ、土木・都市防災に関する基礎知識を3問渡されました。',
    ],
    // 分野別の問題バンク（spec doc 12.1）。プレイのたびに5分野から異なる3分野を
    // ランダムに選び、各分野から1問ずつランダム抽出する（js/stage1-know.jsが実施）。
    // 特定分野（橋梁維持管理等）への偏りを避けるため、橋梁以外の分野も揃えている。
    questionBank: {
      bridge: [
        {
          question: '橋の上を自動車や人が通る部分を何と呼ぶ？',
          choices: ['橋脚', '床版', '支承', '基礎'],
          correctIndex: 1,
        },
        {
          question: '橋を定期的に目視や機器で確認し、異常がないかを調べることを何という？',
          choices: ['点検', '設計', '撤去', '造成'],
          correctIndex: 0,
        },
      ],
      soil: [
        {
          question: '建物や構造物を作る前に、その土地の地盤の強さや性質を調べることを何という？',
          choices: ['測量', '設計', '地盤調査', '施工'],
          correctIndex: 2,
        },
        {
          question: '地震の際、地盤が急激に強度を失い、まるで液体のようになる現象を何という？',
          choices: ['風化', '侵食', '沈下', '液状化'],
          correctIndex: 3,
        },
      ],
      disaster: [
        {
          question: '豪雨などによる浸水や土砂災害の危険性を、あらかじめ地図で確認できる資料を何という？',
          choices: ['ハザードマップ', '路線図', '航空写真', '地番図'],
          correctIndex: 0,
        },
        {
          question: '地震のゆれの強さを、観測地点ごとに表す指標を何という？',
          choices: ['マグニチュード', '震度', '加速度', '深度'],
          correctIndex: 1,
        },
      ],
      river: [
        {
          question: '川の氾濫を防ぐために、川に沿って土などで作られた盛り土状の構造物を何という？',
          choices: ['橋脚', '堤防', '貯水池', '防波堤'],
          correctIndex: 1,
        },
        {
          question: '大雨などにより川の水が堤防を越えたり壊れたりして、周辺に水があふれ出ることを何という？',
          choices: ['噴火', '液状化', '地割れ', '氾濫'],
          correctIndex: 3,
        },
      ],
      urbanPlanning: [
        {
          question: '住居地域・商業地域・工業地域のように、都市計画で土地の使い方を定める区分を何という？',
          choices: ['用途地域', '行政区域', '選挙区', '郵便区域'],
          correctIndex: 0,
        },
        {
          question: '道路や上下水道、電気・ガスなど、都市生活を支える基盤となる施設を何という？',
          choices: ['アメニティ', 'インフラ（社会基盤）', 'ランドマーク', 'モニュメント'],
          correctIndex: 1,
        },
      ],
    },
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
    introButton: '次へ',
    round1NextButton: '地域の声を聞く',
    residentNextButton: 'もう一度考える',
    round2Lead: '別の視点も踏まえて、もう一度考えてみましょう。',
    round2Question: 'あなたなら、最終的にどうする？',
    round2NextButton: '次へ',
    badgeLabel: 'See',
    badgeTitle: 'See ―『みる力』を達成しました',
    badgeExplain: [
      '社会の問題には、一つの正解しか存在しないとは限りません。',
      '他者の立場や社会的背景を含めて物事を見る。',
      'これが See の力です。',
    ],
    nextButton: '次へ',
    // 複数シナリオ（spec doc 13章）。プレイのたびにランダムに1本選ぶ
    // （js/stage2-see.jsが実施）。測定であるPre/Postとは異なり、体験であるSEE/THINKは
    // 一貫性より多様性を優先し、学年に関わらずランダム選択する。
    scenarios: [
      {
        // SEE-A：避難指示のタイミング判断
        diagramVariant: 'flood',
        introLead:
          '大型の台風が接近しています。臨海川の水位が上昇し始め、あなたは避難指示を出すかどうかの判断を任されました。',
        scenarioFacts: [
          '過去に避難指示を出したが、大きな被害が出なかったことがある（「空振り」への不信感がある）',
          '夜間に避難指示を出すと、避難行動そのものが危険になることもある',
          '高齢者や障害のある人などの要配慮者は、早めの避難が必要',
          '指示が遅れれば、逃げ遅れて命に関わるおそれがある',
          '早すぎる・多すぎる指示は、住民の「またか」という気持ちにつながることもある',
        ],
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
            followUp:
              '慎重な判断です。では、様子を見ている間に状況が悪化し、避難そのものが手遅れになる可能性はないでしょうか？',
          },
          {
            label: '気象台や河川管理者に確認してから判断する',
            followUp: '情報を踏まえた判断です。では、確認している間にも水位は上昇し続けています。その時間差はどう考えますか？',
          },
        ],
        residentCharacterName: '高齢者施設 職員',
        residentCharacterRole: '要配慮者の避難を、限られた人手で担っている。',
        residentDialogue: [
          '「早めに情報をもらえると、余裕を持って避難できるので助かります。」',
          '「でも……空振りのたびに入所者を避難させるのは、正直、体力的にも大変なんです。」',
        ],
        round2Closing:
          '防災の判断には、早すぎる・多すぎるリスクと、遅すぎるリスクの両方があります。どちらを重く見るかは、誰の立場に立つかで変わります。',
        round2ClosingAdvanced:
          '空振りを恐れて判断が遅れれば、人命に関わることがあります。逆に、空振りを重ねれば、次第に指示そのものが信頼されなくなるおそれもあります。判断する立場になったとき大切なのは、その両方のリスクを住民に隠さず伝え続ける姿勢です。',
      },
      {
        // SEE-B：避難所運営の判断
        diagramVariant: 'shelter',
        introLead:
          '地震が発生し、避難所には限られた収容人数しかありません。そこへ、体調の悪い高齢者、小さな子ども連れの家族、ペット同伴の住民、日本語が不自由な外国人住民が同時に訪れました。',
        scenarioFacts: [
          '避難所の収容スペースには限りがある',
          '体調の悪い高齢者は、静かで衛生的な環境が必要',
          '小さな子ども連れの家族は、周囲に気を使いながら過ごしている',
          'ペット同伴者を受け入れる避難所は限られている',
          '日本語が不自由な住民には、多言語での情報提供が必要',
        ],
        question: 'あなたが避難所の運営担当者ならどうする？',
        choices: [
          {
            label: '体調の悪い高齢者を優先して受け入れる',
            followUp: '緊急性を重視した判断です。では、他の人たちの居場所はどう確保しますか？',
          },
          {
            label: '早い者勝ちで受け入れる',
            followUp: '公平に見える判断です。では、体調の悪い人が入れなかった場合、どう対応しますか？',
          },
          {
            label: 'ペット同伴者用のスペースを別に確保する',
            followUp: '配慮のある判断です。では、限られたスペースを分けることで、他の人の受け入れ人数は減りませんか？',
          },
          {
            label: '状況を見て、必要な人から個別に対応する',
            followUp: '柔軟な判断です。では、個別対応を続けていると、他の作業をする時間が足りなくなりませんか？',
          },
        ],
        residentCharacterName: '避難所ボランティア',
        residentCharacterRole: '避難所の運営を手伝う地域住民。様々な人と接している。',
        residentDialogue: [
          '「外国人の方が、掲示を読めなくて困っている様子でした。」',
          '「でも、みんな余裕がなくて、誰かを優先すると不満の声も出るんです。」',
        ],
        round2Closing:
          '限られた資源をどう配分するかに、一つの正解はありません。誰の困りごとを優先するかによって、見え方は変わります。',
        round2ClosingAdvanced:
          '避難所運営では、目に見える困りごとだけでなく、声を上げにくい人の存在にも気づく必要があります。配分の判断には、常に説明責任が伴います。',
      },
      {
        // SEE-C：ハザードマップ改定と土地利用の対立
        diagramVariant: 'hazardMap',
        introLead:
          '臨海市が最新の調査に基づきハザードマップを改定し、ある住宅地が新たに浸水想定区域に入ることになりました。',
        scenarioFacts: [
          'ハザードマップの改定は、最新の調査データに基づいている',
          '対象の住宅地には長年暮らしている住民が多い',
          '浸水想定区域に指定されると、資産価値が下がる可能性がある',
          'ハザードマップは将来の危険性を予測するものであり、絶対的な保証ではない',
          '住民説明会が予定されている',
        ],
        question: 'あなたが自治体の担当者なら、住民説明会でどう説明する？',
        choices: [
          {
            label: '改定内容をそのまま正確に伝える',
            followUp: '正確さを重視した判断です。では、資産価値への不安を訴える住民には、どう向き合いますか？',
          },
          {
            label: '資産価値への影響を考慮し、改定を先送りする',
            followUp: '住民感情に配慮した判断です。では、その間に浸水被害が起きた場合、責任をどう考えますか？',
          },
          {
            label: 'ハザードマップの限界（予測であり保証ではない）を丁寧に説明する',
            followUp: '技術的な性質を伝える判断です。では、それでも不安を感じる住民には、どう向き合いますか？',
          },
          {
            label: '対策（避難計画の見直し等）とセットで説明する',
            followUp: '前向きな判断です。では、対策には予算と時間がかかります。今すぐの改定公表とのバランスをどう取りますか？',
          },
        ],
        residentCharacterName: '対象地域の住民',
        residentCharacterRole: 'この土地に30年以上住んでいる。',
        residentDialogue: [
          '「今さら『危険です』と言われても、家を売ることもできないし、正直困るんです。」',
          '「でも、実際に危ないなら、ちゃんと知っておきたいとも思うんですよね。」',
        ],
        round2Closing:
          '正確な情報を伝えることと、住民の不安に寄り添うことは、時に両立が難しくなります。一つの正解はありません。',
        round2ClosingAdvanced:
          'ハザードマップは科学的な予測であり、公表を遅らせることは住民の安全を守る責務と矛盾します。一方で、情報の伝え方次第で、住民の受け止め方は大きく変わります。技術的な正確さと社会的な配慮の両方が、担当者には求められます。',
      },
    ],
  },

  stage3: {
    missionTitle: 'MISSION 3：データから原因を突き止めろ',
    step1Question: 'この現象の原因として、まず何が考えられるでしょうか？',
    step1NextButton: '追加情報を見る',
    step2Lead: '判断する前に、追加情報を確認しましょう。4枚すべてを開くと、次に進めます。',
    step2NextButton: 'もう一度判断する',
    step2LeadBasic: '判断する前に、追加情報を確認しましょう。2枚以上を開くと、次に進めます。',
    step2BasicRequiredCount: 2,
    step3Lead: '集めた情報を踏まえて、もう一度考えてみましょう。',
    step1AnswerReminderPrefix: 'STEP1でのあなたの予想：「',
    step1AnswerReminderSuffix: '」',
    step3Question: 'この現象の原因として、あなたはどう判断しますか？',
    step3Closing: 'データと情報をもとに判断を下しました。次は、その判断を他の人に説明する番です。',
    step3ClosingAdvanced:
      'データだけで原因を断定するのは危険です。専門家は、複数の仮説を残したまま追加調査を提案したり、判断に残る不確実性そのものを関係者に伝えたりすることもあります。',
    step3NextButton: '次へ',
    reportQuestion: 'この判断を上司にどう報告しますか？',
    reportChoices: [
      '結論だけを簡潔に報告する',
      '根拠となったデータを添えて報告する',
      '結論とともに、他の可能性が残ることも伝えて報告する',
      '今後の状況変化（大雨や地震など）で悪化する可能性も含めて報告する',
    ],
    reportClosing:
      'どのように報告するかによって、次に取るべき対応の速さや範囲は変わってきます。伝え方も、判断の一部です。',
    reportClosingAdvanced:
      '報告の仕方は、聞き手がその後どう動くかを左右します。特に不確実性が残る判断ほど、結論だけでなく前提や限界も含めて伝える、技術者としての誠実さが問われます。',
    reportNextButton: '次へ',
    badgeLabel: 'Think',
    badgeTitle: 'Think ―『考える力』を達成しました',
    badgeExplain: [
      '知識やデータを使って問題を発見し、原因を考え、解決策を導く。',
      'さらに、その考えを他者に説明する。',
      'これが Think の力です。',
    ],
    nextButton: '次へ',
    // 複数シナリオ（spec doc 13章）。プレイのたびにランダムに1本選ぶ
    // （js/stage3-think.jsが実施）。SEEと同様、体験としての多様性を優先し、
    // 学年に関わらずランダム選択する。いずれも複数の原因候補が情報だけでは
    // 一つに断定できない設計にする（橋の温度膨張のような一意の正解にしない）。
    scenarios: [
      {
        // THINK-A：望洋台の斜面変位
        diagramVariant: 'slope',
        alertLines: [
          '臨海市郊外の住宅地・望洋台。',
          '造成地の斜面に設置された傾斜計（斜面の傾きの変化を測る機器）から、',
          '「斜面の傾きが昨日より大きく変化した」というデータが届きました。',
        ],
        causeChoices: ['地盤が崩れ始めている', '大雨による一時的な地下水位の変化', 'センサーの異常', 'その他'],
        infoCards: [
          {
            title: '降水量データ',
            body: 'この2日間、臨海市では平年の3倍近い雨が降り続いています。大雨は地盤の中の水位を一時的に押し上げ、傾斜計の値に影響することがあります。一方で、大雨は土砂災害の引き金になることもあり、これだけでは原因を断定できません。',
          },
          {
            title: '過去の変位記録',
            body: 'この斜面では、過去にも大雨のたびに傾斜計がわずかな変化を記録しており、多くは雨が止むと元の値に戻ってきました。ただし、記録が残っている数年の間に一度だけ、変化が元に戻りきらなかったケースもあります。',
          },
          {
            title: '周辺センサー',
            body: '望洋台周辺の別の斜面に設置されたセンサーでも、同じ時期に変化が観測されていますが、変化の大きさは場所によってばらつきがあります。周辺一帯で同じ現象が起きているとは言い切れません。',
          },
          {
            title: '点検記録',
            body: '直近の点検（3週間前、今回の大雨より前）では、地割れなどの異常は確認されていません。ただし、今回の大雨のあとの状態はまだ確認できていません。',
          },
        ],
      },
      {
        // THINK-B：河川水位の急上昇
        diagramVariant: 'river',
        alertLines: [
          '臨海川に設置された水位計から、',
          '「過去1時間で水位が50cm上昇した」というデータが届きました。',
        ],
        causeChoices: ['局地的な豪雨', '上流ダムの放流', '水位計の異常', 'その他'],
        infoCards: [
          {
            title: '上流域の降水量データ',
            body: '臨海川上流の山間部では、この1時間で局地的に強い雨が降ったという記録があります。ただし、同じ時間帯に他の要因が重なっていないかは、これだけでは分かりません。',
          },
          {
            title: 'ダムの放流記録',
            body: '臨海川上流にある望洋ダムでは、この時間帯に貯水量調整のための放流が行われた記録があります。放流量は多くありませんが、豪雨と重なると水位上昇が大きくなることがあります。',
          },
          {
            title: '過去の水位変動パターン',
            body: 'この地点では、過去にも豪雨時やダムの放流時に同程度の水位上昇が記録されており、単独では大きな被害につながらなかったケースがほとんどです。ただし、両方が重なった記録は多くありません。',
          },
          {
            title: '水位計の点検記録',
            body: '直近の点検（2週間前）では、水位計に異常は見つかっていません。ただし、急な水位変化の際に一時的な誤差が生じることが、まれにあります。',
          },
        ],
      },
      {
        // THINK-C：市街地の道路陥没
        diagramVariant: 'road',
        alertLines: ['市街地の道路で、幅1メートルほどの陥没が突然発生しました。'],
        causeChoices: ['地下埋設管の老朽化', '液状化', '過去の埋設工事の施工不良', 'その他'],
        infoCards: [
          {
            title: '地下埋設物台帳',
            body: 'この道路の地下には、40年以上前に設置された下水道管が埋設されています。老朽化した管の破損は、周辺の土砂を巻き込み陥没を引き起こすことがあります。',
          },
          {
            title: '周辺の地盤調査記録',
            body: 'この付近の地盤は、液状化のリスクが「中程度」と評価されています。ただし、直近で液状化を引き起こすような大きな地震や地下水位の変化は記録されていません。',
          },
          {
            title: '過去の陥没履歴',
            body: 'この道路では、過去10年で今回を含めて2回、同じような陥没が発生しています。前回の原因は、埋設工事の際の埋め戻し不良でした。',
          },
          {
            title: '近隣工事の記録',
            body: '陥没箇所の近くでは、半年前に別の業者による埋設工事が行われています。ただし、その工事の記録に不備を示す情報は見当たりません。',
          },
        ],
      },
    ],
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
          { label: '心配させないよう安全だとだけ伝える', risky: true },
          { label: '住民の意見を聞く場を設けてから方針を説明する' },
        ],
        closing: '一人だけの判断では、ここまでの情報も対応も揃いませんでした。',
        closingConsulted:
          '地域住民の声を聞いたことで、判断にも説明にも厚みが加わりました。それでも、実際にどう伝わるかは、住民の反応を見ながら確認していく必要があります。',
        // 「心配させないよう安全だとだけ伝える」を選んだ場合の専用クロージング（spec doc 12.3）。
        closingUnsafeReassurance:
          '「安全です」とだけ伝えることは、住民を安心させる面もありますが、実際の災害対応では、危険性がまだ十分に分かっていない段階で安易な安心情報を伝えると、後から状況が悪化した際に住民の信頼を大きく損なうことがあります。',
        closingUnsafeReassuranceConsulted:
          '「安全です」とだけ伝えることは、住民を安心させる面もありますが、実際の災害対応では、危険性がまだ十分に分かっていない段階で安易な安心情報を伝えると、後から状況が悪化した際に住民の信頼を大きく損なうことがあります。今回はあらかじめ地域住民の声を聞いていたにもかかわらず、その声を踏まえない説明を選んだことにもなります。',
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
    revealLines: [
      '実は、あなたが体験したこの4つの力を身につけることが、',
      '関東学院大学のDiploma Policy（DP）が示す、',
      '卒業までに目指す姿です。',
    ],
    dpTableIntro: 'DPとは、関東学院大学を卒業するときに身につけていてほしい能力を示したものです。',
    dpImage: {
      src: 'assets/images/kgu-diploma-policy.png',
      alt:
        '関東学院大学ディプロマ・ポリシーを示す図。「知る／Know」「みる／See」「考える／Think」' +
        '「働きかける／Act」の4象限が円を四分割する形で配置され、中心には「振り返る／Reflect」と' +
        '「社会連携教育」の帯が置かれている。',
    },
    dpMapping: [
      {
        from: 'Know',
        to: 'DP1 知る／知識・技能',
        definition:
          '社会のさまざまな事象やその背景を体系的に理解するとともに、社会課題を取り巻く人々と対話し相互理解を図るための幅広い教養および各学問領域固有の知識と技能を身につけている。',
      },
      {
        from: 'See',
        to: 'DP2 みる／寛容さ・判断力',
        definition:
          '社会課題を取り巻く人々の社会的・文化的背景を理解したうえで、自己を複雑な社会、多様な文化の中に位置づけて客体化し、倫理観と公平・公正の精神をもって事象を判断する力を身につけている。',
      },
      {
        from: 'Think',
        to: 'DP3 考える／思考力・表現力',
        definition:
          '社会課題の解決に向けて、自ら立てた問いを解決するための道筋を立て、他者の意見を尊重したうえで、自らの意見を明確に表現する力を身につけている。',
      },
      {
        from: 'Act',
        to: 'DP4 働きかける／主体性・協働性',
        definition:
          '社会・地域・組織の一員として、社会課題に誠実に向き合い、多様な背景をもった他者を尊重し協働しながら、課題の解決に向けて、主体的に働きかける意欲と態度を有する。',
      },
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
    preLabel: '最初の回答',
    postLabel: '今の回答',
    // 「適用」設問（Know/See/Think/Actの4問）のみ、Postの回答の正誤をここで表示する
    // （Postアンケート画面自体では表示しない）。1問ずつのページングで表示する（spec 14章）。
    applicationCorrectSuffix: '（正解）',
    applicationIncorrectSuffix: '（不正解。正解は「',
    applicationIncorrectSuffixEnd: '」）',
    // Q2（理解）のみ、正誤ではなく大学公式の定義文を参考として提示する（spec 14.2）。
    officialAnswerTitle: '参考：大学が示している答え',
    officialAnswerLead: 'あなたの考えと、大学の公式な位置づけを見比べてみましょう。',
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
