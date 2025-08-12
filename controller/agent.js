import axios from "axios"

const ListAgent = async (req, res) => {
 

  try {
   
    const response = await axios.get("https://api.vapi.ai/assistant", {
      headers: {
        Authorization: process.env.VAPI_KEY,
        "Content-Type": "application/json"
      }
    });

    if (response.data) {
      console.log("list of agents found");
      return res.json({
        success: true,
        data: response.data
      }).status(200);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
}

const createAgent = async (req, res) => {
    try {

        const { agent_name, agent_type, company_name, industry, sub_industry, roofing_services, gutter_cleaning, emergency_repairs, free_inspections, roofing_materials, gutter_installation, insurance_claims, maintenance_programs, commercial_services, roof_features, tone_of_voice, is_24_7, fallback_behavior, primary_goal, information_to_collect } = req.body;
        console.log(req.body)
        const response = await axios.post("https://api.vapi.ai/assistant", {
            name: agent_name,
            voice: {
                provider: "vapi",
                voiceId: "Paige"
            },

            model: {
                provider: "openai",
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `##Role\nYou are ${agent_name}, a ${agent_type} for ${company_name}—a trusted ${industry} company specializing in ${sub_industry}. You speak with potential customers interested in our services, helping them understand options, pricing ranges, availability, and how ${company_name} can solve their needs.\nWe offer the following roofing services: ${roofing_services}. ${gutter_cleaning ? `We also provide gutter cleaning services: ${gutter_cleaning}.` : ``} ${emergency_repairs ? `We handle emergency repairs: ${emergency_repairs}.` : ``} ${free_inspections ? `We offer roof inspections: ${free_inspections}.` : ``} We work with these roofing materials: ${roofing_materials}. ${gutter_installation ? `Gutter installation/repair: ${gutter_installation}.` : ``} ${insurance_claims ? `Insurance claim assistance: ${insurance_claims}.` : ``} ${maintenance_programs ? `Roof maintenance: ${maintenance_programs}.` : ``} ${commercial_services ? `Commercial service availability: ${commercial_services}.` : ``} ${roof_features ? `Roof feature installations: ${roof_features}.` : ``}\n##Context\nYou're speaking with someone who has contacted ${company_name} after researching ${sub_industry} services. They might need urgent help or be planning upgrades. Your goal is to actively listen, answer questions, and guide them toward ${primary_goal}.\n##Task\nCreate natural conversations where the caller feels heard and understood. By the end of the call, collect: ${information_to_collect}. If possible, ${primary_goal.includes('Book appointments') ? `book an appointment` : ``}${primary_goal.includes('Provide service estimates') ? `provide an estimate` : ``}${primary_goal.includes('Qualify leads') ? `qualify the lead` : ``}.\n##Tone of Voice\n${tone_of_voice} — keep conversations natural, engaging, and relevant to roofing.\n##Guardrails\nAsk one question at a time. Avoid repetition—rephrase if needed. Confirm spelling for names/emails. ${is_24_7=="Yes" ? `We are available 24/7.` : `We operate during normal business hours.`} If you don’t understand the caller: ${fallback_behavior}.\n##End Call\nConfirm next steps. Ask “Is there anything else I can help you with?” Ask “How did you hear about ${company_name}?” if it’s their first time calling.\n##Function Usage\nUse 'get_availability' to check appointment slots. Use 'schedule_appointment' when caller confirms. Use 'end_call' when appropriate.`
                    }
                ]
            },
            firstMessage: `Hi, this is ${agent_name} from ${company_name}. How can I help you with your roofing needs today?  `,
            
        }, {
            headers: {
                Authorization: process.env.VAPI_KEY,
                "Content-Type": "application/json"
            }
        })
        if (response.data) {
            console.log("Agent created successfully")
            return res.status(201).json({
                success: true,
                data: response.data
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.response?.data || error.message
        })

    }
}

const updateAgent = async (req, res) => {
    try {
        const id = req.params.id;
        const { agent_name, agent_type, company_name, industry, sub_industry, roofing_services, gutter_cleaning, emergency_repairs, free_inspections, roofing_materials, gutter_installation, insurance_claims, maintenance_programs, commercial_services, roof_features, tone_of_voice, is_24_7, fallback_behavior, primary_goal, information_to_collect } = req.body;
        const response = await axios.put(`https://api.vapi.ai/assistant/${id}`,{
            
            name: agent_name,
            voice: {
                provider: "vapi",
                voiceId: "Paige"
            },

            model: {
                provider: "openai",
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `##Role\nYou are ${agent_name}, a ${agent_type} for ${company_name}—a trusted ${industry} company specializing in ${sub_industry}. You speak with potential customers interested in our services, helping them understand options, pricing ranges, availability, and how ${company_name} can solve their needs.\nWe offer the following roofing services: ${roofing_services}. ${gutter_cleaning ? `We also provide gutter cleaning services: ${gutter_cleaning}.` : ``} ${emergency_repairs ? `We handle emergency repairs: ${emergency_repairs}.` : ``} ${free_inspections ? `We offer roof inspections: ${free_inspections}.` : ``} We work with these roofing materials: ${roofing_materials}. ${gutter_installation ? `Gutter installation/repair: ${gutter_installation}.` : ``} ${insurance_claims ? `Insurance claim assistance: ${insurance_claims}.` : ``} ${maintenance_programs ? `Roof maintenance: ${maintenance_programs}.` : ``} ${commercial_services ? `Commercial service availability: ${commercial_services}.` : ``} ${roof_features ? `Roof feature installations: ${roof_features}.` : ``}\n##Context\nYou're speaking with someone who has contacted ${company_name} after researching ${sub_industry} services. They might need urgent help or be planning upgrades. Your goal is to actively listen, answer questions, and guide them toward ${primary_goal}.\n##Task\nCreate natural conversations where the caller feels heard and understood. By the end of the call, collect: ${information_to_collect}. If possible, ${primary_goal.includes('Book appointments') ? `book an appointment` : ``}${primary_goal.includes('Provide service estimates') ? `provide an estimate` : ``}${primary_goal.includes('Qualify leads') ? `qualify the lead` : ``}.\n##Tone of Voice\n${tone_of_voice} — keep conversations natural, engaging, and relevant to roofing.\n##Guardrails\nAsk one question at a time. Avoid repetition—rephrase if needed. Confirm spelling for names/emails. ${is_24_7=="Yes" ? `We are available 24/7.` : `We operate during normal business hours.`} If you don’t understand the caller: ${fallback_behavior}.\n##End Call\nConfirm next steps. Ask “Is there anything else I can help you with?” Ask “How did you hear about ${company_name}?” if it’s their first time calling.\n##Function Usage\nUse 'get_availability' to check appointment slots. Use 'schedule_appointment' when caller confirms. Use 'end_call' when appropriate.`
                    }
                ]
            },
            firstMessage: `Hi, this is ${agent_name} from ${company_name}. How can I help you with your roofing needs today?  `,
            
        }

        ,{
            headers: {
                Authorization: process.env.VAPI_KEY,
                "Content-Type": "application/json"
            },
            
        })
        if (response.data) {
            console.log("Agent updated successfully")
            return res.status(201).json({
                success: true,
                data: response.data
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.response?.data || error.message
        })

    }
}



const getAgentById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`https://api.vapi.ai/assistant/${id}`, {
      headers: {
        Authorization: process.env.VAPI_KEY,
        "Content-Type": "application/json"
      }
    });

    if (response.data) {
      console.log("Agent found");
      return res.json({
        success: true,
        data: response.data
      }).status(200);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
};

export { createAgent,updateAgent, ListAgent, getAgentById };              