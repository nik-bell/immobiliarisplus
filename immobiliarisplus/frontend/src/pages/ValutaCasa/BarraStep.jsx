import React from 'react';

const steps = [
    { id: 1, name: 'Dati essenziali' },
    { id: 2, name: 'Dettagli immobile' },
    { id: 3, name: 'Contatti' },
];

const BarraStep = ({ currentStep }) => {
    return (
        <div className="p-4 max-w-lg mx-auto">
            <nav aria-label="Progress" className="flex items-center justify-center">
                {steps.map((step, index) => {
                    const isCurrent = step.id === currentStep;
                    const isCompleted = step.id < currentStep;
                    
                    let circleClasses = 'bg-gray-200 text-gray-500';
                    let nameClasses = 'text-gray-600';
                    let lineClasses = 'bg-gray-200';

                    if (isCurrent) {
                        circleClasses = 'bg-indigo-900 text-white';
                        nameClasses = 'text-indigo-900 font-medium';
                    } else if (isCompleted) {
                        circleClasses = 'bg-teal-500 text-white'; 
                        nameClasses = 'text-teal-900';
                        lineClasses = 'bg-teal-500'; 
                    }

                    return (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center flex-shrink-0">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${circleClasses}`}
                                >
                                    {isCompleted ? (
                                        <svg 
                                            className="w-6 h-6 text-white" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M5 13l4 4L19 7" 
                                            />
                                        </svg>
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                <p className={`mt-2 text-sm ${nameClasses}`}>
                                    {step.name}
                                </p>
                            </div>

                            {index < steps.length - 1 && (
                                <div className="flex-1 px-2">
                                    <div
                                        className={`h-0.5 w-full ${lineClasses}`}
                                    ></div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </nav>
        </div>
    );
};

export default BarraStep;