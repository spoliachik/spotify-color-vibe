import { useEffect, useState } from "react";
import axios from 'axios';

export default function useAuth(givenCode) {
    const [accessToken, setAccessToken] = useState();
    const code = (givenCode.code.code)

    useEffect(() => {
        axios
            .post("https://vl7au1ue2f.execute-api.us-east-1.amazonaws.com/staging/login", { code })
            .then((response) => {
                console.log("successfully in useAuth .then")

                if (response.statusCode === 404) {
                    console.log("ERROR in api...");
                }
                //if success then cut the code string from the URL and execute next thing
                // window.history.pushState({}, null, "/");
                console.log(response.body);
                console.log(response);
                setAccessToken(response.data.accessToken);
        })
        .catch((err) => {
            //if fail, redirect to home page (Login page)
            console.log(`the code was ${code}`);
            console.log("catch")
            console.log(err);
            // window.location = "/";
        });
        // try {
        //     const response = API.post('spotifyAPI', '/spotifyLogin', { code });
        //     console.log(response.data);
        //     setAccessToken(response.data.accessToken);
        // } catch (err) {
        //     console.log('catch');
        //     console.log(err);
        //     window.location = "/";
        // }
    }, [code]);

    return accessToken;
}