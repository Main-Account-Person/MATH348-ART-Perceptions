<script lang="ts" context="module">
    export async function load({ params }) {
        const { category } = params;
        return {
            props: {
                category: category,
            },
        };
    }
</script>

<script lang="ts">
    import { fade } from "svelte/transition";
    import RangeSlider from "svelte-range-slider-pips";
    import type { GalleryArt } from "../../lib/models/GalleryArtModel";
    import NavigationBar from "$lib/NavigationBar.svelte";
    import artworkJSON from "../../api/artwork.json";

    Array.prototype.shuffle = function () {
        return this.sort(() => Math.random() - 0.5);
    };

    export let category: string;
    var index: number = 0;

    const artwork: GalleryArt[] = artworkJSON;
    const categoryArt: GalleryArt[] = artwork.filter(
        (art) => art.category === category
    );
    categoryArt.shuffle();
    var artObject: GalleryArt = categoryArt[index];

    const surveyQuestions: { question: String; responseValue: Number[] }[] = [
        {
            question: "How would you rate the complexity of the design?",
            responseValue: [5],
        },
        {
            question: "How innovative do you find the use of materials?",
            responseValue: [5],
        },
        {
            question:
                "How would you rate the artwork’s ability to spark the imagination?",
            responseValue: [5],
        },
        {
            question: "How visually pleasing do you find this piece to be?",
            responseValue: [5],
        },
        {
            question:
                "How significant do you find the choice of subject matter?",
            responseValue: [5],
        },
        {
            question: "How skillfully is the artwork crafted?",
            responseValue: [5],
        },
        {
            question: "How meaningful do you find the piece subjectively?",
            responseValue: [5],
        },
        {
            question: "How successfully does the piece convey an idea?",
            responseValue: [5],
        },
        {
            question:
                "How much of an “artist’s touch” do you find in this piece?",
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

        if (scrollPercent >= 65) {
            scrollPercent = 65;
        }
        dividerWidth += scrollPercent;
        divider.style.width = dividerWidth + "%";
    }

    // TODO: Show response/whether survey was submitted properly
    // don't allow multiple submissions on same load
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful

    enum SurveyStatus {
        input = "input",
        incomplete = "incomplete",
        success = "success",
        failure = "failure",
    }

    var surveyStatus: SurveyStatus = SurveyStatus.input;

    async function submitResults() {
        console.log(emailResponse, isInPerson, surveyStatus);
        if (surveyStatus === SurveyStatus.success) {
            return;
        } else if (!emailResponse || !isInPerson) {
            surveyStatus = SurveyStatus.incomplete;

            const form = window.document.getElementById("form-wrapper");
            form.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            var responses = {};
            for (let i = 1; i < surveyQuestions.length; i++) {
                responses["q" + i] = surveyQuestions[i].responseValue[0];
            }

            let surveyEntry = {
                email: emailResponse,
                in_person: isInPerson,
                responses: responses,
                art_id: artObject.id,
            };

            const url =
                process.env.NODE_ENV == "development"
                    ? "http://localhost:3000/api/survey"
                    : "https://math-348-art-perceptions.vercel.app/api/survey";

            fetch(url, {
                method: "POST",
                body: JSON.stringify(surveyEntry),
            }).then((response) => {
                if (!response.ok) {
                    surveyStatus = SurveyStatus.failure;
                } else {
                    if (index === categoryArt.length - 1) {
                        surveyStatus = SurveyStatus.success;
                    } else {
                        index += 1;
                        artObject = categoryArt[index];
                        const form =
                            window.document.getElementById("form-wrapper");
                        form.scrollTo({ top: 0, behavior: "smooth" });
                    }
                }
            });
        }
    }
</script>

<body class="content">
    <NavigationBar />
    <body class="survey-content">
        <div class="ArtInfoCard">
            <img src={artObject.images[0].imageURL} alt="Artwork" />
            <h1>{artObject.title}</h1>
            <h4>by {artObject.artist}</h4>
        </div>

        <!-- {#if surveyStatus === SurveyStatus.success} -->
        <!--     Your response has successfully been added. Thank you! -->
        <!-- {:else} -->
        <!-- <div class="status-wrapper"> -->
        <!-- <span class="status-text" -->
        <!-- // >Your response has successfully been recorded. Thank you!</span -->
        <!-- // > -->
        <div class="questions {surveyStatus}">
            {#if surveyStatus === SurveyStatus.success}
                <div transition:fade class="status-text">
                    <p>Your responses have successfully been recorded.</p>
                    <p>Thank you!</p>
                    <a
                        href="/results"
                        style="padding: 1rem; text-decoration: none;"
                        >view the results</a
                    >
                </div>
            {/if}
            <header>
                <h2>Questions ({index + 1}/{categoryArt.length})</h2>
                <hr class="divider" id="divider" />
            </header>

            <div
                class="form-wrapper"
                id="form-wrapper"
                on:scroll={handleScroll}
            >
                <label class="email-input">
                    <b>Your Email:</b>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        bind:value={emailResponse}
                    />
                </label>
                {#if surveyStatus === SurveyStatus.incomplete && !emailResponse}
                    <span style="color: red; margin-bottom: 0.1rem;"
                        >* this field is required</span
                    >
                {/if}

                <b style="margin-top: 1rem;"
                    >Are you in-person at the Gund Gallery?</b
                >
                {#if surveyStatus === SurveyStatus.incomplete && !isInPerson}
                    <span style="color: red; margin-bottom: 0.1rem;"
                        >* this field is required</span
                    >
                {/if}
                <span class="in-person-wrapper">
                    <label>
                        <input
                            id="inperson"
                            type="radio"
                            name="inperson"
                            bind:group={isInPerson}
                            value="true"
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            id="inperson"
                            type="radio"
                            name="inperson"
                            bind:group={isInPerson}
                            value="false"
                        />
                        No
                    </label>
                </span>

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
        <!-- </div> -->
        <!-- {/if} -->
    </body>
</body>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        --range-slider: rgb(248 249 255);
        /* --range-handle-inactive: #3e01b4; */
        --range-handle: #3e01b4;
        --range-handle-focus: #3e01b4;
        /* --range-float: #3e01b4; */
    }

    .content {
        /* background-image: url("../../../../images/background.jpeg"); */
        /* background-position: center; */
        /* background-repeat: no-repeat; */
        /* background-size: cover; */

        background: linear-gradient(#f29e5a, purple, #3e01b4 120vh, #340198);
        margin: 0;
        padding: 0;
    }

    .survey-content {
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

    .status-text {
        position: absolute;
        height: 7rem;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        align-items: center;
        z-index: 1;
        font-size: larger;
        font-weight: bold;
    }

    .questions {
        /* min-width: 40%; */
        background-color: rgba(248, 249, 249, 0.85);
        /* margin-left: 1rem; */
        border-radius: 20px;
        box-shadow: 0px 2px 10px rgb(248, 249, 249);
        /* opacity: 80%; */
        position: relative;
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
        overflow-y: scroll;
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

    .email-input {
        display: flex;
        align-items: center;
    }

    .email-input b {
        width: 30%;
    }

    .email-input input {
        width: 100%;
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

    .in-person-wrapper {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
    }

    .questions.success header {
        filter: blur(4px);
        pointer-events: none;
    }

    .questions.success .form-wrapper {
        filter: blur(4px);
        pointer-events: none;
    }
</style>
