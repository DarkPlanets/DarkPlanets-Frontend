/* eslint-disable import/no-anonymous-default-export */
export default {
  navbar: {
    title: "다크 플래닛",
    login: "메타마스크를 이용한 로그인 🦊",
    logout: "로그 아웃",
    pages: [
      // {
      //   title: "래리티랜드",
      //   url: "/rarityland",
      // },
      {
        title: "가이드 및 팁",
        url: "/guides",
      },
    ],
  },
  indexPage: {
    title: "다크 플래닛에 오신 것을 환영합니다",
    input_id: "소환사 ID를 입력하세요...",
    search_btn: "찾다",
    save_image_btn: "이미지를 저장",
    land_id: "토지 ID를 입력하세요...",
  },
  raritylandPage: {
    title: "RarityLand",
    description: "소환사의 땅. 구축 및 수익 창출을 시작합니다.",
  },
  guidesPage: {
    title: "가이드 및 팁",
    description:
      "이 페이지에는 Dark Planet을 시작하는 방법에 대한 모든 정보가 포함되어 있습니다.",
    qa: [
      {
        title: "startCollectingEnergy(uint256 rarityID)",
        description:
          "다크 플래닛의 주민으로 소환사에 합류하여 에너지 수집을 시작하세요. 이때 소환사의 에너지는 시간이 지남에 따라 증가합니다. 에너지를 수집하는 동안 소환사도 노출될 위험이 있습니다. 노출된 소환사는 전투에 참여하여 승자의 기력이 증가하고 패자의 기력이 0으로 돌아가 죽은/약탈 상태입니다. 데드 상태의 소환사는 triggerCaptureMechanism 기능을 실행할 수 있습니다. 처형에 성공하면 소환사의 기력이 상승하고 한 번 죽은 소환사가 다시 활성화되어 다시 에너지 약탈 전쟁에 참여할 수 있습니다.",
      },
      {
        title: "endCollectingEnergy(uint256 rarityID)",
        description:
          "에너지 수집을 중지하십시오. 이때 소환사의 상태는 은폐되며 에너지가 모이는 것을 멈춥니다. 숨겨진 소환사는 발견되어 전투에 참여할 위험이 없습니다.",
      },
      {
        title: "triggerCaptureMechanism(uint256 rarityID)",
        description:
          "모든 행성 거주자는 이 기능을 실행할 수 있습니다. 성공에는 운이 필요합니다. 포획에 성공하면 집행자의 에너지가 증가합니다. 어둠의 숲의 법칙에 따르면 소환사는 자신이 언제 노출될지, 상대가 누구인지 알지 못합니다. 생존율을 높이기 위해 소환사는 노출되기 전에 에너지를 높이기 위해 최선을 다해야 합니다. 이 기능은 마지막 100명까지 계속되며 다크 플래닛은 당분간...",
      },
    ],
  },
  adventurePage: {
    title: "다크 플래닛 어드벤처",
    description: "에너지를 수집하여 게임 시작 ⚡",
    btn_list: [
      {
        title: "에너지 수집 시작 ⚡",
        tag: "start_energy",
      },
      {
        title: "에너지 수집 중지 ⚡",
        tag: "stop_energy",
      },
      {
        title: "트리거 캡처",
        tag: "trigger_capture",
      },
    ],
    error_msg: {
      start_energy: "지금은 에너지 수집을 시작할 수 없습니다.",
      stop_energy: "지금은 에너지 수집을 중지할 수 없습니다.",
      trigger_capture: "지금은 캡처를 실행할 수 없습니다. 다시 시도해 주세요!",
    },
  },
  stats: {
    players_remain: "남은 선수",
    total_players: "총 플레이어",
    name: "이름",
    description: "설명",
    exp: "특급",
    points: "포인트들",
    status: "상태",
    expRate: "경험치",
    summonerID: "소환사",
    totalSupply: "총 공급",
    land_claimed: "주장",
  },
  error: {
    not_login: "소환사 ID로 검색하려면 메타마스크에 로그인하세요.",
    not_numeric: "숫자 ID를 입력하세요.",
    not_registered: "죄송합니다. 현재 등록되어 있지 않습니다!",
    user_eliminated: "죄송합니다, 당신은 제거되었습니다!",
    login_to_view: "로그인하여 보기",
  },
};
