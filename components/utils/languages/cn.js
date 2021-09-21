/* eslint-disable import/no-anonymous-default-export */
export default {
  navbar: {
    title: "黑暗星球",
    login: "使用 Metamask 登录 🦊",
    logout: "登出",
    pages: [
      // {
      //   title: "稀有之地",
      //   url: "/rarityland",
      // },
      {
        title: "指南和提示",
        url: "/guides",
      },
    ],
  },
  indexPage: {
    title: "欢迎来到黑暗星球",
    input_id: "输入你的召唤师ID...",
    search_btn: "搜索",
    save_image_btn: "保存图片",
    land_id: "输入您的土地 ID...",
  },
  raritylandPage: {
    title: "稀有之地",
    description: "召唤师之地。 开始建设和赚钱。",
  },
  guidesPage: {
    title: "指南和提示",
    description: "此页面包含有关如何开始使用黑暗星球的所有信息",
    qa: [
      {
        title: "startCollectingEnergy(uint256 rarityID)",
        description:
          "作为黑暗星球的居民加入你的召唤师并开始收集能量。 这时召唤者的能量随着时间的推移而增长。 在收集能量的同时，你的召唤师也有暴露的风险。 暴露召唤师进入战斗，胜利者能量增加，失败者能量归0，即死亡/掠夺状态。 处于死亡状态的召唤者可以执行 triggerCaptureMechanism 函数。 如果处决成功，你的召唤师能量会增加，曾经死去的召唤师会被重新激活，可以再次参与能量掠夺战。",
      },
      {
        title: "endCollectingEnergy(uint256 rarityID)",
        description:
          "停止收集能量。 此时召唤者状态隐藏，能量停止收集。 隐藏的召唤师没有被发现和参与战斗的风险。",
      },
      {
        title: "triggerCaptureMechanism(uint256 rarityID)",
        description:
          "所有星球居民都可以执行此功能。 成功需要运气。 捕获成功后，执行者的能量增加。 根据黑暗森林的法则，召唤师不知道自己什么时候会暴露，也不知道对手是谁。 为了提高自己的存活率，召唤师们应该在暴露前尽量增加自己的能量。 该活动将持续到最后 100 人，而黑暗星球将处于和平状态……暂时。",
      },
    ],
  },
  adventurePage: {
    title: "黑暗星球冒险",
    description: "通过收集能量开始游戏 ⚡",
    btn_list: [
      {
        title: "开始收集能量 ⚡",
        tag: "start_energy",
      },
      {
        title: "停止收集能量 ⚡",
        tag: "stop_energy",
      },
      {
        title: "触发捕捉",
        tag: "trigger_capture",
      },
    ],
    error_msg: {
      start_energy: "此时无法开始能量收集。",
      stop_energy: "此时无法停止能量收集。",
      trigger_capture: "此时无法触发捕获。 请再试一次！",
    },
  },
  stats: {
    players_remain: "剩余球员",
    total_players: "玩家总数",
    name: "姓名",
    description: "描述",
    exp: "经验值",
    points: "积分",
    status: "地位",
    expRate: "费用率",
    summonerID: "召唤师",
    totalSupply: "总供应量",
    land_claimed: "声称",
  },
  error: {
    not_login: "请登录 metamask 以使用您的召唤师 ID 进行搜索",
    not_numeric: "请输入数字 ID",
    not_registered: "抱歉，您目前尚未注册！",
    user_eliminated: "对不起，你被淘汰了！",
    login_to_view: "登录查看",
  },
};
