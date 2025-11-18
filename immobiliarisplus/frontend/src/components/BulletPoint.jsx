const BulletPoint = ({ number, title, description, colorClass }) => {
  return (
    <div className="flex items-start space-x-4 py-3">
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${colorClass}`}
        aria-hidden="true"
      >
        {number}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>
        <p className="text-base text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default BulletPoint;