const BulletPoint = ({ number, title, description, colorClass, className = '', value = '' }) => {
  let classDiv = '';
  let h3Text = '';
  let pText = '';
  if (value == 'homepage') {
    classDiv = 'items-center';
    h3Text = 'text-center';
    pText = 'text-center';
  }
  else {
    classDiv = 'items-start';
    h3Text = 'items-start';
    pText = 'text-left';
  }
  return (
    <div className={`
    ${className} 
    ${classDiv}       
    flex           
    space-x-4             
    py-3                  
`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${colorClass}`}
        aria-hidden="true"
      >
        {number}
      </div>
      <div className={`${h3Text} flex flex-col`}>
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>
        <p className={`${pText} text-base text-gray-600`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default BulletPoint;