import { Textarea, Box, Button } from "@mantine/core";

export function InputTextBox() {
   return (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-11/12 max-w-[700px] mb-4 ">
            <Box className="p-4 rounded-lg shadow-lg bg-gray-700 border border-gray-600">
                <Textarea
                    className="w-full bg-gray-700 border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Paste your message here..."
                    autosize
                    minRows={2}
                    maxRows={10}
                />
                <Button
                    // implement onClick
                    fullWidth
                    mt="md"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Send Message
                </Button>
            </Box>
        </div>
    );
}