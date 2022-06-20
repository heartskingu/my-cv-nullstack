import Nullstack from "nullstack";
import "./Application.css";
import ComicContainer from "./components/comic-container/ComicContainer";
import ComicBox from "./components/comic-box/ComicBox";
import ProgressBar from "./components/progress-bar/ProgressBar";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore/lite";

class Application extends Nullstack {
  person = {};
  skills = {};
  career = {};

  prepare({ page }) {
    page.locale = "en-US";
  }

  async initiate(context) {
    await this.startDB(context);
    this.person = await this.getPerson(context);
    this.skills = await this.getSkills(context);
    this.career = await this.getCareer(context);
  }

  static async startDB(context) {
    context.db = getFirestore(context.app);
  }

  static async getPerson({ db }) {
    const q = query(
      collection(db, "people"),
      where(documentId(), "==", "anthonytoniolli")
    );
    const personSnapshot = await getDocs(q);
    const person = personSnapshot.docs.map((doc) => doc.data())[0];
    return person;
  }

  static async getCareer({ db }) {
    const q = query(
      collection(db, "personCareer"),
      where("personId", "==", "anthonytoniolli")
    );
    const careerSnapshot = await getDocs(q);
    const career = careerSnapshot.docs.map((doc) => doc.data())[0];
    career.careerDescription.reverse();
    career.careerYears.reverse();
    return career;
  }

  static async getSkills({ db }) {
    const q = query(
      collection(db, "personSkills"),
      where("personId", "==", "anthonytoniolli")
    );
    const skillsSnapshot = await getDocs(q);
    const skills = skillsSnapshot.docs.map((doc) => doc.data())[0];
    return skills;
  }

  async clickMe() {
    await this.getPerson();
  }

  renderHeader() {
    return (
      <section class="header">
        {this.person && (
          <ComicBox
            bgColor="color-three"
            patternColor="pattern-color-one"
            className="me-image-container"
          >
            <img alt="my-photo" src={this.person.avatar} class="me-image" />
          </ComicBox>
        )}
        {this.person && (
          <ComicBox bgColor="color-two" patternColor="pattern-color-one">
            <h2
              class="color-light font-size-xl text-shadow-big-color-dark text-align-center"
              style="line-height: 1.2"
            >
              {`A GREAT ${this.person.job} FOR YOUR COMPANY`}
            </h2>
          </ComicBox>
        )}
      </section>
    );
  }

  renderSkillListItem({ children }) {
    return (
      <li class="font-size-l color-light text-shadow-medium-color-dark skill-list-item">
        {children}
      </li>
    );
  }

  renderArticle() {
    return (
      <article class="article">
        {this.person && (
          <section class="personal-info">
            <h1 class="font-size-xl text-shadow-big-color-dark color-two stroke-dark">{`${this.person.firstName} ${this.person.lastName}`}</h1>
            <h2 class="font-size-l">{`${this.person.job}`}</h2>
            <p class="font-size-m">{`${this.person.city}, ${this.person.country}`}</p>
          </section>
        )}
        <section>
          <ComicBox
            className="skills-container"
            bgColor="color-four"
            patternColor="pattern-color-two"
          >
            <h2 class="font-size-xl text-shadow-big-color-dark color-three stroke-dark">
              SKILLS
            </h2>
            {this.skills && (
              <ul>
                {this.skills.skillNames.map((skill, index) => (
                  <SkillListItem>
                    <span class="text-align-right">{skill}</span>
                    <ProgressBar level={this.skills.skillLevels[index]} />
                  </SkillListItem>
                ))}
              </ul>
            )}
          </ComicBox>
        </section>
      </article>
    );
  }

  renderWorkLi({ year, description }) {
    return (
      <li class="work-li">
        <span class="font-size-l color-light text-shadow-medium-color-dark">
          {year}
        </span>
        <span class="font-size-s font-bold">{description}</span>
      </li>
    );
  }

  renderAside() {
    return (
      <aside class="aside">
        <ComicBox
          className="aside-box"
          bgColor="color-one"
          patternColor="pattern-color-two"
        >
          <h2 class="font-size-xl text-shadow-big-color-dark color-three stroke-dark">
            WORK
          </h2>
          {this.career && (
            <ol>
              {this.career.careerDescription.map((careerItem, index) => (
                <WorkLi
                  year={this.career.careerYears[index]}
                  description={careerItem}
                />
              ))}
            </ol>
          )}
        </ComicBox>
      </aside>
    );
  }

  renderMain() {
    return (
      <main class="main">
        <Article />
        <Aside />
      </main>
    );
  }

  renderFooterLi({ children }) {
    return <li class="font-size-s font-bold">{children}</li>;
  }

  renderFooter() {
    return (
      <ComicBox
        className="footer"
        bgColor="color-three"
        patternColor="pattern-color-one"
      >
        <img alt="contact-me-1" src="./images/phone-1.png" />
        {this.person && (
          <ul class="contact">
            <FooterLi>{`Phone: ${this.person.phone}`}</FooterLi>
            <FooterLi>{`Email: ${this.person.email}`}</FooterLi>
            <FooterLi>
              LinkedIn:{" "}
              <a
                class="anchor"
                href={this.person.linkedin}
              >{`${this.person.firstName} ${this.person.lastName}`}</a>
            </FooterLi>
            {this.person.telegram && (
              <FooterLi>{`Telegram: ${this.person.telegram}`}</FooterLi>
            )}
          </ul>
        )}
        <img alt="contact-me-2" src="./images/phone-2.png" />
      </ComicBox>
    );
  }

  render() {
    return (
      <>
        <ComicContainer>
          <Header />
          <Main />
          <Footer />
        </ComicContainer>
      </>
    );
  }
}

export default Application;
