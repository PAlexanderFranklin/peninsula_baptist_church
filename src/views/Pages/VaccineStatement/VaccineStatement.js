import React from "react";
import "./VaccineStatement.css";
// import statementpdf from './PeninsulaBaptistVaccineStatement.pdf';

function VaccineStatement(props) {
  return (
    <div className="VaccineStatement bubble">
      <h2>Introduction</h2>
      <p>
        The following is Peninsula Baptist's Statement concerning Christian
        freedom of conscience regarding vaccines. We've adopted this Statement
        in order to set forth the case that there are legitimate spiritual
        reasons to decline these medications for any whose conscience or
        understanding of Holy Scripture should so lead them. We do not hold the
        position that all Christians are obligated to abstain from receiving
        either the Covid 19 or any other vaccinations, but we do hold that the
        same are obligated by Scripture to not violate their own consciences.
      </p>
      <p>
        This statement is also available as a{" "}
        <a
          href="https://peninsula-baptist-sermon-audio.s3.us-west-2.amazonaws.com/PeninsulaBaptistVaccineStatement.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          pdf
        </a>
      </p>
      <h2>Statement</h2>
      <p>
        <span className="bold_vaccine">Whereas</span> Scripture makes it clear
        that every human being is created in the image of God and that all
        innocent human life should be protected from conception to natural
        death, and
      </p>
      <p>
        <span className="bold_vaccine">Whereas</span> abortion destroys an
        innocent human life, and
      </p>
      <p>
        <span className="bold_vaccine">Whereas</span> fetal cells used in
        medical experimentation were obtained via abortion, and
      </p>
      <p>
        <span className="bold_vaccine">Whereas</span> the Southern Baptist
        Convention has condemned both abortion (2021) and the use of fetal cells
        in medical experimentation (1992), and
      </p>
      <p>
        <span className="bold_vaccine">Whereas</span> fetal cells obtained via
        abortion were used in the development and/or production of certain
        vaccines, including all covid-19, rubella, chicken pox, and hepatitis A
        vaccines available in the United States
        (https://lozierinstitute.org/cell-lines-used-for-viral-vaccine-production/
        and
        https://lozierinstitute.org/what-you-need-to-know-about-the-covid-19-vaccine/
        ), and
      </p>
      <p>
        <span className="bold_vaccine">Whereas</span> covid-19 and other
        vaccines are available outside the United States without use of fetal
        cells in either development or production, and
      </p>
      <p>
        <span className="bold_vaccine">Whereas</span> the continued use of
        vaccines developed or produced with fetal cells will encourage the
        abortion of more babies in the future to replenish the supply of fetal
        cells, and
      </p>
      <p>
        <span className="bold_vaccine">Whereas</span> David set the example that
        drinking water obtained through danger to his men was equivalent to
        drinking their blood and therefore refused (2 Samuel 23:15-17), and
      </p>
      <p>
        <span className="bold_vaccine">Whereas</span> we should not encourage
        our brothers to violate their conscience (1 Corinthians 8 and Romans
        14), and
      </p>
      <p>
        <span className="bold_vaccine">Whereas</span> many Christians find it a
        violation of their conscience to benefit from vaccines which use fetal
        cells, be it therefore
      </p>
      <p>
        <span className="bold_vaccine">Resolved,</span> that we, the members of
        Peninsula Baptist Church, support and commend the resolutions of the
        Southern Baptist Convention concerning both abortion and fetal
        experimentation, and further be it
      </p>
      <p>
        <span className="bold_vaccine">Resolved,</span> that we support the
        conscience rights of our members and fellow believers to refuse any
        vaccines which use fetal cells in development, testing, and/or
        production, and further be it
      </p>
      <p>
        <span className="bold_vaccine">Resolved,</span> that we call upon the
        various federal and state governments to recognize the religious freedom
        to refuse any vaccines which use fetal cells, and further be it
      </p>
      <p>
        <span className="bold_vaccine">Resolved,</span> that we call upon the US
        Federal Government to encourage the development and/or importation of
        vaccines which do not use fetal cells, and further be it
      </p>
      <p>
        <span className="bold_vaccine">Resolved,</span> that we call upon the
        Southern Baptist Convention to adopt a similar resolution concerning the
        use of fetal cells in vaccines.
      </p>
    </div>
  );
}

export default VaccineStatement;
