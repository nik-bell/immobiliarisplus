const BulletPointImg = ({ imgSrc, title, description, className = '' }) => {
  return (
    <div className={`flex items-start space-x-4 py-3 ${className}`}>
      <div className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden bg-gray-200">
        {imgSrc ? (
          <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Foto
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-base text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default BulletPointImg;

