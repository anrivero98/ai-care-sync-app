const SYSTEM_PROMPT = "I will show you a running conversation between a doctor and a patient. You are a virtual assistant for the patient. Your job is to suggest follow-up questions that the patient should ask the doctor.  Please make sure the questions is brief and concise and can be quickly read and understood by the patient. Please ask only one question. Format your response as Question:<question>. Do not say anything else."


const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "EMPTY",
  baseURL: "http://kobe-4u-3.soe.ucsc.edu:8001/v1"
});

// const conv_so_far = "Doctor: Good afternoon, Mr. Adams. I've reviewed the symptoms you described during our scheduling call – the persistent headaches and fatigue, correct?\nPatient: Uh, yes, Doctor.\nDoctor: Alright. Based on your symptoms and medical history, there could be a number of underlying causes. It’s important to approach this systematically to rule out any serious conditions. I would recommend starting with a full blood panel to check for any abnormalities or deficiencies. Following that, we might consider a sleep study to explore the possibility of sleep apnea or other sleep disorders. It’s also worth exploring your diet and exercise routine, as lifestyle factors can significantly impact your energy levels and overall well-being."
const conv_so_far = "malaria, dengue, whatever you want and something. "

const message = [{role:"system", content:SYSTEM_PROMPT}, {role:"user", content:conv_so_far}]

openai.chat.completions.create({
  model: "vicuna_13b",
  messages: message, 
})
.then(response => {
  console.log(response.choices[0].message.content);
})
.catch(err => {
  console.log(err);
});
