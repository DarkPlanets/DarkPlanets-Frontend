/* eslint-disable react/no-unescaped-entities */
const StatisticsCard = ({ stats }) => {
  return (
    <div className="flex flex-col items-center mt-14 z-50">
      <h2 className="py-5 text-2xl font-bold">Stats</h2>
      {stats?.status === 3 && <p className="py-5">You've been eliminated!</p>}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:w-1/2 gap-5">
        {Object.keys(stats).map((st, index) => {
          if (st === "image") return null;
          return (
            <div key={index} className="bg-blue-500 rounded-md px-3 pb-4 pt-3">
              <p className="font-bold text-xl">
                {st.replace(/^\w/, (c) => c.toUpperCase())}
              </p>
              <p className="py-2">{stats[st]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatisticsCard;
