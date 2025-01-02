import NavBar from "./navbar";
import "../styles/about.css";

export default function About() {
  return (
    <div>
      <NavBar />
      <div className="main-content">
        <div
          className="main-top"
          style={{ width: "100%", height: "100px", marginBottom: "20px" }}
        >
          <div className="header-about">About</div>
        </div>
        <div className="references-container">
          <p>Civic engagement behaviors: </p>
          <p>
            (1) Doolittle, A., & Faul, A. C. (2013). Civic engagement scale: A
            validation study. SAGE Open, 3(3), 1–7.
            https://doi.org/10.1177/2158244013495542
          </p>
          <br />
          <p>STEM interest: </p>
          <p>
            (2) Lent, R. W., Brown, S. D., Schmidt, J., Brenner, B., Lyons, H.,
            & Treistman, D. (2003). Relation of contextual supports and barriers
            to choice behavior in engineering majors: Test of alternative social
            cognitive models. Journal of Counseling Psychology, 50(4), 458–465.
            https://doi.org/10.1037/0022-0167.50.4.458
          </p>
          <p>
            (3) Byars-Winston, A., Estrada, Y., Howard, C., Davis, D., & Zalapa,
            J. (2010). Influence of social cognitive and ethnic variables on
            academic goals of underrepresented students in science and
            engineering: A multiple-groups analysis. Journal of Counseling
            Psychology, 57(2), 205–218. https://doi.org/10.1037/a0018608
          </p>
          <br />
          <p>STEM self-efficacy: </p>
          <p>
            (4) Lent, R. W., Brown, S. D., & Larkin, K. C. (1986). Self-efficacy
            in the prediction of academic performance and perceived career
            options. Journal of Counseling Psychology, 33(3), 265–269.
            https://doi.org/10.1037/0022-0167.33.3.265
          </p>
          <p>
            (5) Byars-Winston, A., Estrada, Y., Howard, C., Davis, D., & Zalapa,
            J. (2010). Influence of social cognitive and ethnic variables on
            academic goals of underrepresented students in science and
            engineering: A multiple-groups analysis. Journal of Counseling
            Psychology, 57(2), 205–218. https://doi.org/10.1037/a0018608
          </p>
          <br />
          <p>STEM outcome expectations: </p>
          <p>
            (6) Lent, R. W., Brown, S. D., Brenner, B., Chopra, S. B., Davis,
            T., Talleyrand, R., & Suthakaran, V. (2001). The role of contextual
            supports and barriers in the choice of math/science educational
            options: A test of social cognitive hypotheses. Journal of
            Counseling Psychology, 48(4), 474–483.
            https://doi.org/10.1037/0022-0167.48.4.474
          </p>
          <p>
            (7) Byars-Winston, A., Estrada, Y., Howard, C., Davis, D., & Zalapa,
            J. (2010). Influence of social cognitive and ethnic variables on
            academic goals of underrepresented students in science and
            engineering: A multiple-groups analysis. Journal of Counseling
            Psychology, 57(2), 205–218. https://doi.org/10.1037/a0018608
          </p>
          <br />
          <p>Research outcome expectations: </p>
          <p>
            (8) Bieschke, K. J. (2000). Factor structure of the research outcome
            expectations scale. Journal of Career Assessment, 8(3), 303–313.
            https://doi.org/10.1177/106907270000800307
          </p>
          <br />
          <p>Research self-efficacy</p>
          <p>
            (9) Bieschke, K. J., Bishop, R. M., & Garcia, V. L. (1996). The
            utility of the research self-efficacy scale. Journal of Career
            Assessment, 4(1), 59–75. https://doi.org/10.1177/106907279600400104
          </p>
          <br />
        </div>
      </div>
    </div>
  );
}
