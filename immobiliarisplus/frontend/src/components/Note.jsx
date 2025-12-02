const Note = ({ children, className = '', textClassName = '' }) => {
    return (
        <div className={className}>
            <p className={textClassName}>
                <span className="font-bold">Nota: </span>
                {children}
            </p>
        </div>
    );
};

export default Note;