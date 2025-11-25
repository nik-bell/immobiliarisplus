import React from 'react';

const steps = [
    { id: 1, name: 'Dati essenziali' },
    { id: 2, name: 'Dettagli immobile' },
    { id: 3, name: 'Contatti' },
];

const BarraStep = ({ currentStep }) => {
    return (
        <div className="p-4 max-w-lg mx-auto">
            <nav aria-label="Progress" className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const isCurrent = step.id === currentStep;
                    const isCompleted = step.id < currentStep;
                    const isFuture = step.id > currentStep;

                    let circleClasses = 'bg-gray-200 text-gray-500';
                    let nameClasses = 'text-gray-600';
                    let lineClasses = 'bg-gray-200';

                    if (isCurrent) {
                        circleClasses = 'bg-indigo-900 text-white';
                        nameClasses = 'text-indigo-900 font-medium';
                    } else if (isCompleted) {
                        circleClasses = 'bg-indigo-700 text-white';
                        nameClasses = 'text-indigo-900';
                        lineClasses = 'bg-indigo-700';
                    }

                    return (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center flex-shrink-0">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${circleClasses}`}
                                >
                                    {step.id}
                                </div>
                                <p className={`mt-2 text-sm ${nameClasses}`}>
                                    {step.name}
                                </p>
                            </div>

                            {index < steps.length - 1 && (
                                <div className="flex-1 min-w-10 px-2">
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