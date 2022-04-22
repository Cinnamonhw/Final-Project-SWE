import emailjs from "emailjs-com";
import React from 'react';
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const contact_form_key = process.env.REACT_APP_CONTACTFORM_KEY

export default function ContactUs() {

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('gmail', 'template_pnl6vrr', e.target, contact_form_key)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    }

    return (
        <div>
            <button>
                <a href="/trending_page">Return to App</a>
            </button>
            <div className="container">
                <form onSubmit={sendEmail}>
                    <div className="row pt-5 mx-auto">
                        <div className="col-8 form-group mx-auto">
                            <input type="text" className="form-control" placeholder="Name" name="name" />
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Email Address" name="email" />
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="btn btn-info" value="Share"></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}