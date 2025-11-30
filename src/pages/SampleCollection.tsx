import React, { useEffect, useState } from "react";
import { Toast } from "../components/Toast";

export default function SampleCollection() {
    const [is_recording, set_is_recording] = useState(false);
    const [machine_id, set_machine_id] = useState("");
    // const [number_of_splits, set_number_of_splits] = useState(4);
    // const [split_duration, set_split_duration] = useState(3);
    const [popup_message, set_popup_message] = useState(
        "Recording in progress..."
    );
    const [toast_message, set_toast_message] = useState<string | null>(null);
    const [toast_color, set_toast_color] = useState<string | null>("#4f4f4fff");

    const handlemachine_idChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.value;
        set_machine_id(id);
    };

    function showToast(msg: string, color: string) {
        set_toast_message(msg);
        set_toast_color(color);
        setTimeout(() => set_toast_message(null), 3000);
    }

    // Call server /record endpoint
    const startServerRecording = async (durationSeconds?: number) => {
        console.log("Sending to server:", { machine_id, is_recording });
        try {
            const response = await fetch("http://localhost:5050/record", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ machine_id, is_recording: true }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Server error");
            }
            console.log("Recording response:", data);
            return data;
        } catch (error) {
            console.error("Error calling /record endpoint:", error);
            throw error;
        }
    };

    // Handle record button click
    async function onRecordClick() {
        set_is_recording(true);
        try {
            const result = await startServerRecording();
            showToast(`Recording Completed`, "#4f4f4fff");
            // for (let i = 0; i < number_of_splits; i++) {
            //     const result = await startServerRecording(split_duration);
            //     // Instead of mapping over recordings/errors, just show status
            //     showToast(
            //         `Split ${i + 1}/${number_of_splits}: ${result.status}`
            //     );
            // }
        } catch (error) {
            console.error("Recording failed:", error);
            showToast("Recording failed. Please try again.", "#ff4f4fff");
        } finally {
            set_is_recording(false);
        }
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only start recording on Enter if a machine ID is entered and not already recording
            if (e.key === "Enter" && machine_id.trim() && !is_recording) {
                onRecordClick();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Cleanup when component unmounts
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [machine_id, is_recording]); // Re-run effect if machine_id or is_recording changes

    return (
        <div>
            <Toast message={toast_message} color={toast_color}/>
            <div>
                <input
                    id="machine_id"
                    className="machine-id"
                    type="text"
                    value={machine_id}
                    onChange={handlemachine_idChange}
                    placeholder="Enter Machine ID"
                    autoFocus
                />
            </div>

            <button
                className="record-button"
                onClick={onRecordClick}
                disabled={!machine_id.trim() || is_recording}
            >
                Start Recording
            </button>

            {/* Recording Popup */}
            {is_recording && (
                <div className="recording-popup">
                    <p>{popup_message}</p>
                </div>
            )}
        </div>
    );
}
