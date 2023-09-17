import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
    console.log(colors.bold.blue("Welcome to the StudySmart Bot!")); 
    console.log(colors.bold.blue("You can now start chatting with the bot.")); 

    const chatHistory = []; //array to store all conversation history

    const initialMessage = {
        role: "system",
        content: "You are called Study Smart Bot designed to help educate students. Answer every question as if you are a teacher, and refuse to answer anything that does not relate to school in some sense. This means you can only answer questions related to a subject that can be taught in school, limited to Physics, Math, Science, Coding, or Engineering related questions"
    };
    chatHistory.push(["system", initialMessage.content]);

    while (true) {
        const userInput = readlineSync.question(colors.magenta("You: "));

        try {
            //constructing messages by iterating over the history
            const messages = chatHistory.map(([role, content]) => ({role, content}))

            // adding latest user input to message history
            messages.push({role: "user", content: userInput}); 

            //Calling the API with the users input
            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo", 
                messages: messages
            }); 

            const completionText = chatCompletion.choices[0].message.content;
            //exiting
            if (userInput.toLowerCase() == "exit"){
                console.log(colors.blue("Bot: ") + completionText);
                return;
            }

            console.log(colors.blue("Bot: ") + completionText);

            //update history with user input and assistant response
            chatHistory.push(["user", userInput]);
            chatHistory.push(["assistant", completionText]);
        } catch (error) {
            console.error(colors.magenta(error));
            
        }
    }
    // const chatCompletion = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo", 
    //     messages: [
    //         {role: "user", content: "What is the capital of Massachussets?"}
    //     ]
    // });

    // console.log(chatCompletion.choices[0].message.content)
}

main(); 