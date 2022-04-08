<script lang="ts" context="module">
  import artworkJSON from "../api/sample-artwork.json"
  export async function load({ params, fetch }) {
    const { id } = params;
    // const response = await fetch(
    //   process.env.NODE_ENV == "development"
    //     ? "http://localhost:3000/api/artwork.json"
    //     : "https://art-perceptions.vercel.app/api/artwork.json"
    // );
    // const json = await response.json();
    const galleryResults = artworkJSON;
    return { props: { id: id, galleryResults: galleryResults } };
  }
</script>

<script lang="ts">
  import RangeSlider from "svelte-range-slider-pips";
  // import { galleryResults } from "../../stores";
  import type { GalleryArt } from "../../lib/models/GalleryArtModel";
  import NavigationBar from "$lib/NavigationBar.svelte";
  export let id: Number;
  export let galleryResults: GalleryArt[];
  let artObject: GalleryArt = galleryResults.filter(function (art) {
    return art.id == id;
  })[0];

  const surveyQuestions: { question: String; responseValue: Number[] }[] = [
    {
      question: "How would you rate the complexity of the design?",
      responseValue: [5],
    },
    {
      question: "How interesting do you find the use of materials?",
      responseValue: [5],
    },
    {
      question: "How creative do you find the piece to be?",
      responseValue: [5],
    },
    {
      question: "How aesthetically pleasing do you find this piece to be?",
      responseValue: [5],
    },
    {
      question: "How significant do you find the choice of subject matter?",
      responseValue: [5],
    },
    {
      question:
        "How novel do you find the use of the techniques in constructing the piece?",
      responseValue: [5],
    },
    {
      question: "How meaningful do you find the piece subjectively?",
      responseValue: [5],
    },
    {
      question: "How accurate do you find the piece objectively?",
      responseValue: [5],
    },
    {
      question: "How much of an “artist’s touch” do you find in this piece?",
      responseValue: [5],
    },
  ];

  var emailResponse: string;
  var isInPerson: boolean;

  function handleScroll() {
    const form = window.document.getElementById("form-wrapper");
    const maxHeight = form.scrollHeight - form.clientHeight;
    var scrollPercent = (form.scrollTop / maxHeight) * 80;

    const divider = window.document.getElementById("divider");
    var dividerWidth: number = 20;
    // if (scrollPercent >= 20) {
    //     dividerWidth = scrollPercent;
    // }

    if (scrollPercent >= 65) {
      scrollPercent = 65;
    }
    dividerWidth += scrollPercent;
    divider.style.width = dividerWidth + "%";

    // console.log(form.clientWidth, dividerWidth * 8);
  }

  async function submitResults() {
    var responses = {};
    for (let i = 1; i < surveyQuestions.length; i++) {
      responses["q" + i] = surveyQuestions[i].responseValue[0];
    }

    let surveyEntry = {
      email: emailResponse,
      in_person: isInPerson,
      responses: responses,
      art_id: artObject.id
    }

    console.log(surveyEntry);
    const url = process.env.NODE_ENV == "development"
          ? "http://localhost:3000/api/survey"
          : "https://art-perceptions.vercel.app/api/survey";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(surveyEntry)
    });
  }
</script>

<main>
  <NavigationBar />
  <body>
    <div class="ArtInfoCard">
      <img src={artObject.images[0].imageURL} alt="Image" />
      <h1>{artObject.title}</h1>
      <h4>by {artObject.artist}</h4>
    </div>

    <div class="questions">
      <h2>Questions</h2>
      <hr class="divider" id="divider" />

      <div class="form-wrapper" id="form-wrapper" on:scroll={handleScroll}>
        <span class="question">
          <label>Your Email:</label>
          <input type="email" placeholder="Email" bind:value={emailResponse} />
        </span>

        <!-- <span class="question"> -->
        <label><b>Are you in-person at the Gund Gallery?</b></label>
        <span style="margin-bottom: 1rem;">
          <label style="min-width: 3ch;">Yes</label>
          <input type="radio" name="inperson" bind:group={isInPerson} value="true"/>
          <label style="min-width: 3ch;">No </label>
          <input type="radio" name="inperson" bind:group={isInPerson} value="false"/>
        </span>
        <!-- </span> -->

        <!-- <h3>Please answer the following questions.</h3> -->
        <!-- <h3>On a scale from 1 - 10...</h3> -->

        {#each surveyQuestions as question}
          <div class="survey-question">
            <b>{question.question}</b>
            <RangeSlider
              min={1}
              max={10}
              step={1}
              bind:values={question.responseValue}
              pips="true"
              all="label"
              float="true"
            />
          </div>
        {/each}

        <button class="submit-button" on:click={submitResults}>
          <h3>Submit</h3>
          <svg
            viewBox="0 0 82 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M48.6804 81.4707C50.1778 81.4707 51.4718 80.8685 52.5622 79.6641C53.6528 78.4597 54.5886 76.8646 55.3698 74.879L80.1745 10.084C80.5652 9.07491 80.8663 8.13904 81.0779 7.27644C81.2895 6.41378 81.3952 5.60811 81.3952 4.85944C81.3952 3.52478 80.9965 2.45868 80.1989 1.66115C79.4015 0.863615 78.3354 0.464844 77.0007 0.464844C76.2521 0.464844 75.4464 0.570649 74.5837 0.782249C73.7211 0.993849 72.8015 1.29495 71.8249 1.68555L6.59052 26.6855C4.8653 27.3366 3.40047 28.1992 2.19604 29.2734C0.991618 30.3477 0.389404 31.6498 0.389404 33.1797C0.389404 35.1329 1.04858 36.5245 2.36693 37.3545C3.68529 38.1846 5.32102 38.8926 7.27412 39.4785L34.4226 47.4863L42.3327 74.1954C42.9187 76.2461 43.6348 77.9714 44.4812 79.3711C45.3276 80.7709 46.7273 81.4707 48.6804 81.4707ZM36.3757 40.8457L10.6921 32.8867C10.5294 32.8217 10.4155 32.7566 10.3503 32.6914C10.2853 32.6264 10.2527 32.5613 10.2527 32.4961C10.2527 32.2683 10.3992 32.1055 10.6921 32.0078L59.2761 13.6484C61.0014 12.9974 62.7022 12.265 64.3786 11.4512C66.0551 10.6374 67.7397 9.83991 69.4323 9.05865C67.9675 10.263 66.4376 11.5163 64.8425 12.8184C63.2475 14.1205 61.8477 15.3737 60.6433 16.5781L36.3757 40.8457ZM49.4128 71.7051C49.3152 71.7051 49.2338 71.6563 49.1687 71.5586C49.1036 71.461 49.0385 71.3308 48.9734 71.168L41.0144 45.4844L65.282 21.2656C66.4864 20.0287 67.7559 18.6046 69.0905 16.9932C70.4252 15.3819 71.6785 13.8275 72.8503 12.3301C72.0691 14.0228 71.2634 15.7155 70.4333 17.4082C69.6033 19.101 68.8627 20.8425 68.2116 22.6328L49.8523 71.168C49.7221 71.5261 49.5756 71.7051 49.4128 71.7051Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </body>
</main>

<style>
  :root {
    --range-slider: rgb(248 249 255);
    /* --range-handle-inactive: #3e01b4; */
    --range-handle: #3e01b4;
    --range-handle-focus: #3e01b4;
    /* --range-float: #3e01b4; */
  }

  main {
    background-image: url("../../../../images/background.jpeg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  body {
    /* width: 100%; */
    height: calc(100vh - 7rem);
    margin: 0;
    padding: 0 4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 5rem;
    padding-bottom: 2rem;
  }

  .ArtInfoCard {
    /* width: 50%; */
    max-width: 50%;
    background-color: rgba(248, 249, 249, 0.8);
    padding: 2rem;
    /* margin-right: 1rem; */
    border-radius: 20px;
    box-shadow: 0px 2px 10px rgb(248, 249, 249);
    /* opacity: 80%; */
  }

  .ArtInfoCard img {
    max-width: 100%;
    max-height: 80%;
    /* object-fit: scale-down; */
  }

  .ArtInfoCard h1 {
    margin: 1rem 0 0 0;
  }

  .questions {
    /* min-width: 40%; */
    background-color: rgba(248, 249, 249, 0.85);
    /* margin-left: 1rem; */
    border-radius: 20px;
    box-shadow: 0px 2px 10px rgb(248, 249, 249);
    /* opacity: 80%; */
  }

  .questions h2 {
    margin: 1rem 1rem 0rem 1rem;
  }

  .divider {
    width: 20%;
    border: 2px solid rgb(100, 15, 176);
    border-radius: 50px;
    margin: 0 1rem 1rem 1rem;
    animation: ease 0.2;
  }

  .form-wrapper {
    max-height: 90%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    margin: 1rem;

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .form-wrapper::-webkit-scrollbar {
    display: none;
  }

  .form-wrapper h3 {
    margin: 0.1rem 0;
  }

  input {
    padding: 0.5rem;
    border: 0;
    border-radius: 5px;
  }

  .question {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .question input {
    width: 80%;
  }

  .survey-question {
    margin-top: 2rem;
  }

  .submit-button {
    margin-top: 2.5rem;
    padding: 0.2rem;
    background-color: transparent;
    border: solid 3px #3e01b4;
    border-radius: 25px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    min-height: 3.5rem;
    color: #3e01b4;
    transition: 0.2s ease;
  }

  .submit-button:hover {
    background-color: #3e01b4;
  }

  .submit-button:hover * {
    color: #f4d3b8;
    fill: #f4d3b8;
  }

  .submit-button svg {
    height: 2rem;
    fill: #3e01b4;
  }

  .submit-button * {
    margin: 0 0.2rem;
  }
</style>
