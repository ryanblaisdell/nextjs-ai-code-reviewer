import { Textarea } from "@mantine/core";

export function InputTextBox() {
    return (
        <>
            <Textarea
                style={{ width: 500 }}
                placeholder="Paste your code here..."
                autosize
                minRows={2}
                maxRows={4}
            />
        </>
    )
}