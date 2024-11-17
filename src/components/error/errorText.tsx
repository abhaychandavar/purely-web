const ErrorMessage = ({ message, icon }: { message: string, icon?: React.ReactNode }) => {
    if (icon) {
        return (
            <div className='flex flex-row gap-1 items-center'>
                {icon}
                <p className='text-e text-sm text-danger'>{message}</p>
            </div>
        );
    }
    return (
        <p className='text-e text-sm text-danger'>{message}</p>
    );
}

export default ErrorMessage;