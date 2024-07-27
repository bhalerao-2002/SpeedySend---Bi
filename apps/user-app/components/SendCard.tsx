"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    const handleSend = async () => {
        // Validation
        if (!number || !amount) {
            toast.error("All fields must be filled.", { autoClose: 2000 }); // 2 seconds
            return;
        }
        if (isNaN(Number(amount)) || Number(amount) <= 0) {
            toast.error("Amount must be a positive number.", { autoClose: 2000 }); // 2 seconds
            return;
        }

        try {
            // Call the p2pTransfer function
            await p2pTransfer(number, Number(amount) * 100);
            // Success toast
            toast.success(`You requested to send ${amount}Rs to User: ${number}`, { autoClose: 2000 }); // 2 seconds
        } catch (error) {
            // Error toast
            toast.error("Unable to proceed with your request", { autoClose: 2000 }); // 2 seconds
        }
    };

    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput
                            placeholder={"Number"}
                            label="Number"
                            onChange={(value) => {
                                setNumber(value);
                            }}
                        />
                        <TextInput
                            placeholder={"Amount"}
                            label="Amount"
                            onChange={(value) => {
                                setAmount(value);
                            }}
                        />
                        <div className="pt-4 flex justify-center">
                            <Button onClick={handleSend}>Send</Button>
                        </div>
                    </div>
                </Card>
            </Center>
            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
}
