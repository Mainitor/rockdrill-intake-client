export function Toast({ message }: { message: string | null }) {
    if (!message) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#563232ff",
                color: "#fff",
                padding: "12px 20px",
                borderRadius: "8px",
                zIndex: 9999,
                boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
        >
            {message}
        </div>
    );
}
