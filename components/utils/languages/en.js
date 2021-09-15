/* eslint-disable import/no-anonymous-default-export */
export default {
  navbar: {
    title: "Dark Planet",
    login: "Login using Metamask 🦊",
    logout: "Logout",
    pages: [
      {
        title: "Adventure",
        url: "/adventure",
      },
      {
        title: "Guides & Tips",
        url: "/guides",
      },
    ],
  },
  indexPage: {
    title: "Welcome to Dark Planet",
    input_id: "Enter your Rarity ID...",
    search_btn: "Search",
    save_image_btn: "Save Image",
  },
  guidesPage: {
    title: "Guides & Tips",
    description:
      "This page contains all information on how to get started with Dark Planet",
    qa: [
      {
        title: "startCollectingEnergy(uint256 rarityID)",
        description:
          "Join your summoner as a resident of the Dark Planet and begin collecting energy. At this time the summoner's energy grows with time. While collecting energy, your summoner is also at risk of exposure. Exposed summoners enter into battle, where the energy of the winner increases, and the energy of the loser returns to 0, which is a dead/looted state. Summoners in the dead state can execute the triggerCaptureMechanism function. If execution is successful your summoner's energy increases and the once-dead summoner will be reactivated and can participate in the energy plundering war again.",
      },
      {
        title: "endCollectingEnergy(uint256 rarityID)",
        description:
          "Stop collecting energy. At this time, the summoner's state is hidden, and energy stops collecting. Hidden summoners are at no risk of being discovered and engaging in battle.",
      },
      {
        title: "triggerCaptureMechanism(uint256 rarityID)",
        description:
          "All planet residents can execute this function. Success requires luck. After the capture is successful, the executor's energy increases. According to the law of the dark forest, summoners do not know when they will be exposed or who their opponents are. In order to improve their survival rate, summoners should try their best to increase their energy before exposure. The function will continue until the last 100 people, and the Dark Planet will be at peace... for now.",
      },
    ],
  },
  adventurePage: {
    title: "Dark Planet Adventure",
    description: "Start playing by collecting Energy ⚡",
  },
  stats: {
    players_remain: "Players Remaining",
    total_players: "Total Players",
    name: "Name",
    description: "Description",
    exp: "Exp",
    points: "Points",
    status: "Status",
    expRate: "Exp Rate",
    summonerID: "Summoner",
    totalSupply: "Total Supply",
  },
  error: {
    not_login:
      "Please log into metamask to be able to search using your RarityID",
    not_numeric: "Please enter a numeric ID",
    not_registered: "Sorry, you are currently not registered!",
    user_eliminated: "Sorry, you've been eliminated!",
    login_to_view: "Login to view",
  },
};
