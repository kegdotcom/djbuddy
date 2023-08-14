import React, { useState, FormEvent } from "react";

export default function Prompter() {
  interface FormData {
    n: string;
    type: "song" | "artist" | "album" | "genre" | "emotion";
    context: string;
  }

  const [formData, setFormData] = useState<FormData>({
    n: "1",
    type: "song",
    context: "",
  });

  function handleInputUpdate(propName: string) {
    return (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [propName]: ev.target.value });
    };
  }

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const newPrompt = { ...formData };
    if (newPrompt.context.trim().length === 0) return;

    const openAItoken = process.env.REACT_APP_OPENAI_API_KEY;
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAItoken}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Find me ${formData.n} songs on Spotify that are similar to this ${formData.type}: ${formData.context}`,
          },
        ],
        temperature: 0.75,
      }),
    })
      .then((response) => response.json())
      .then((data) => window.alert(JSON.stringify(data)));

    setFormData({ n: "1", type: "song", context: "" });
  }

  return (
    <div className="prompter" key="prompter">
      <form
        className="prompter prompter-form"
        key="prompter-form"
        onSubmit={onSubmit}
      >
        Find me
        <input
          className="prompter prompter-input"
          key="prompter-input-number"
          type="number"
          defaultValue={1}
          min={1}
          max={50}
          onChange={handleInputUpdate("n")}
        />
        songs like this
        <select
          className="prompter prompter-input"
          key="prompter-input-type"
          form="prompter-form"
          name="Prompt Type"
          onChange={handleInputUpdate("type")}
        >
          <option value="song">Song</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
          <option value="genre">Genre</option>
          <option value="emotion">Emotion</option>
        </select>
        :
        <input
          className="prompter prompter-input"
          key="prompter-input-context"
          type="text"
          placeholder="Context"
          onChange={handleInputUpdate("context")}
        />
        <input
          className="prompter prompter-submit"
          key="prompter-submit"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}
