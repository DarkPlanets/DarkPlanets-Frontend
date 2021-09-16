/* eslint-disable import/no-anonymous-default-export */
export default {
  navbar: {
    title: "ダークプラネット",
    login: "Metamaskを使用してログインします 🦊",
    logout: "ログアウト",
    pages: [
      // {
      //   title: "ゲームします",
      //   url: "/play",
      // },
      {
        title: "ガイドとヒント",
        url: "/guides",
      },
    ],
  },
  indexPage: {
    title: "ダークプラネットへようこそ",
    input_id: "サモナーIDを入力してください...",
    search_btn: "検索",
    save_image_btn: "画像を保存",
  },
  guidesPage: {
    title: "ガイドとヒント",
    description:
      "このページには、ダークプラネットの使用を開始する方法に関するすべての情報が含まれています",
    qa: [
      {
        title: "startCollectingEnergy(uint256 rarityID)",
        description:
          "ダークプラネットの居住者としてサモナーに加わり、エネルギーの収集を開始します。 この時、召喚者のエネルギーは時間とともに成長します。 エネルギーを集めている間、あなたの召喚者はまた暴露の危険にさらされています。 露出した召喚者は戦闘に参加し、勝者のエネルギーが増加し、敗者のエネルギーが0に戻ります。これは死んだ/略奪された状態です。 デッド状態のサモナーは、triggerCaptureMechanism関数を実行できます。 実行が成功すると、召喚者のエネルギーが増加し、かつて死んだ召喚者が再びアクティブになり、エネルギー略奪戦争に再び参加できるようになります。",
      },
      {
        title: "endCollectingEnergy(uint256 rarityID)",
        description:
          "エネルギーの収集を停止します。 このとき、召喚者の状態は隠され、エネルギーの収集が停止します。 隠された召喚者は発見されて戦闘に参加するリスクはありません。",
      },
      {
        title: "triggerCaptureMechanism(uint256 rarityID)",
        description:
          "すべての惑星居住者はこの機能を実行できます。 成功には運が必要です。 キャプチャが成功すると、エグゼキュータのエネルギーが増加します。 暗い森の法則によれば、召喚者は彼らがいつ露出されるか、または彼らの敵が誰であるかを知りません。 生存率を向上させるために、召喚者は曝露前にエネルギーを増やすために最善を尽くす必要があります。 機能は最後の100人まで続き、ダークプラネットは平和になります...今のところ。",
      },
    ],
  },
  adventurePage: {
    title: "ダークプラネットアドベンチャー",
    description: "エネルギーを集めてプレイを開始 ⚡",
    btn_list: [
      {
        title: "エネルギーの収集を開始します ⚡",
        tag: "start_energy",
      },
      {
        title: "エネルギーの収集を停止します ⚡",
        tag: "stop_energy",
      },
      {
        title: "トリガーキャプチャ",
        tag: "trigger_capture",
      },
    ],
    error_msg: {
      start_energy: "現在、エネルギー収集を開始できません。",
      stop_energy: "現在、エネルギー収集を停止することはできません。",
      trigger_capture:
        "現在、キャプチャをトリガーできません。 もう一度やり直してください！",
    },
  },
  stats: {
    players_remain: "残っているプレイヤー",
    total_players: "総プレイヤー数",
    name: "名前",
    description: "説明",
    exp: "Exp",
    points: "ポイント",
    status: "状態",
    expRate: "経験率",
    summonerID: "サモナー",
    totalSupply: "総供給",
  },
  error: {
    not_login:
      "サモナーIDを使用して検索できるようにするには、メタマスクにログインしてください",
    not_numeric: "数値IDを入力してください",
    not_registered: "申し訳ありませんが、現在登録されていません。",
    user_eliminated: "申し訳ありませんが、あなたは排除されました！",
    login_to_view: "ログインして表示",
  },
};
