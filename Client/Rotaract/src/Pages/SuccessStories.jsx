import React from 'react';
import '../Styles/SuccessStories.css';
import SavanaDurgaImage from '../../public/Images/Savanadurga2.jpeg'
import SavanaDurgaImage1 from '../../public/Images/Savanadurga.jpeg'
import NewsPaper from '../../public/Images/NewsPaper.jpeg'
import BloodDonationCamp from '../../public/Images/Blood-Donation-Camp.png';
import SchoolActivity from '../../public/Images/Government-School-Engagement-Activity.png'
const SuccessStories = () => {
    return (
        <div className="success-wrapper">
            <div className="success-headings">
                <h1 className="main-title">Our Success Stories</h1>
                <h2 className="subtitle">Plantation Initiative</h2>
            </div>

            <div className="success-container">
                <div className="success-info">
                    <p>
                        Under the guidance of Tejo Murthy, our Rotaract Club successfully conducted an impactful project at Savanadurga.
                        We cleared over 250 kg of waste, promoting environmental awareness among trekkers and locals.
                        More than 100 volunteers united to restore the natural beauty of the area.
                        The project inspired a strong message of sustainability and community responsibility

                    </p>
                </div>

                <div className="success-image">
                    <img
                        src={SavanaDurgaImage}
                        alt="Plantation Drive"
                    />
                </div>
            </div>
            <div className="success-gallery">
                <img
                    id='one'
                    src={SavanaDurgaImage1}
                    alt="Eco Project"
                    className="gallery-img"
                />
                <img
                    src={NewsPaper}
                    alt="NewsPaper"
                    className="gallery-img"
                />
            </div>
            <div className="blood-drive-container">
                <div className="blood-drive-info">
                    <div className="BloodDonationCamp">
                        <h1>Blood Donation Camp</h1>
                    </div>
                    <h3>
                        Our Rotaract Club has successfully organized multiple blood donation drives, saving countless lives through timely contributions.
                        With the support of over 1000 members and local hospitals, we’ve ensured a steady supply of blood for those in critical need.
                    </h3>
                </div>
                <div className="blood-drive-image">
                    <img
                        src={BloodDonationCamp}
                        alt="Blood Donation"
                    />
                </div>
            </div>
            <div className="school-activity-container">
                <div className="school-activity-image">
                    <img
                        src={SchoolActivity}
                        alt="Government School Activity"
                    />
                </div>
                <div className="school-activity-info">
                    <h2 className="section-title">Government School Activity</h2>
                    <h3>
                        Our Rotaract Club conducted engaging activities and provided essential
                        educational supplies in government schools, aiming to uplift young minds
                        through creative learning and community support.
                    </h3>
                </div>
            </div>


        </div>
    );
};

export default SuccessStories;
