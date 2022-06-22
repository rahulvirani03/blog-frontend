import { Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { BlogTime } from "../../Components/BlogTime";
import { FlexBox } from "../../Components/Common";
import { primary } from "../../Utils/colors";
import { maxWidth, borderRadius } from "../../Utils/constants";

const PostContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 2rem;
  border: 1px solid #dbdbdb;
  border-radius: ${borderRadius};
  padding: 0px 0.2em;
  max-width: ${maxWidth};
`;
const TitleContainer = styled.div`
  flex-direction: column;
  border-bottom: 1px solid #dbdbdb;
  padding: 0.5em;

  .profile {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    background-color: ${primary};
    color: white;
    @media screen and (max-width: 550px) {
      margin-top: 5px;
    }
  }
  .by {
    margin: 0px 0.5rem;

    padding: 0px;
    text-decoration: underline;
    font-size: 15px;
    color: ${primary};
  }
`;
const TitleTypo = styled(Typography)``;
const PostImageContainer = styled.div`
  width: 50%;
  height: 300px;

  overflow: hidden;
  margin: 1em auto;
  border: 1px solid #808080;
  border-radius: ${borderRadius};
  img {
    height: 100%;
    width: 100%;
    object-position: 100% 120%;
  }
`;

const DescriptionContainer = styled.div`
  width: 100%;
  margin: auto;
  .border-top {
    padding: 0px;
    border-top: 1px solid #dbdbdb;
  }
  span {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    width: 90%;
    text-align: justify;
    padding: 0 0.8em;
  }
`;
const TagContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  display: flex;
  border-top: 1px solid #dbdbdb;
  .another-container {
    display: flex;
    gap: 10px;
    padding: 0.5em 0.8em;
    width: 90%;
    .tags {
      background-color: ${primary};
      color: white;
      font-size: 12px;
      padding: 4px;
      text-align: center;
      height: fit-content;

      border-radius: 15px;
    }
  }
  .border-top {
    padding: 0px;
    border-top: 1px solid #dbdbdb;
  }
`;
export const Post = () => {
  const data = {
    title: "India's takeaway",
    description:
      "Dravid has refused to read too much into performances in a single series, but perhaps Shreyas Iyer missed a golden chance to show his wares at No.3. With Rohit Sharma and KL Rahul expected to take the opening slots at the World Cup, Shreyas had the chance to leave his prints all over the #3 spot early - a position for which he will jostle with Virat Kohli. Though Shreyas has also been a victim of trying to hit out in some tough batting conditions against South Africa, there are a couple of red flags - against pace and wrist spin - that dampen his case.       The extra bounce on offer in Australia and the bigger square boundaries will come as further hindrance for the top-order batter who has just not been able to get on top of rising deliveries.            Shreyas Iyer's struggles against pace in this series",
    tags: ["Cricket", "Sports"],
    imageURL:
      "http://res.cloudinary.com/dgfuuouxu/image/upload/v1655726743/gay5mcyijcje30yjuw6l.jpg",
    time: "2022-06-20T12:05:39.775Z",
    creatorId: "62b05f8ed3069b5a32821523",
    isGlobal: true,
  };
  return (
    <PostContainer>
      <TitleContainer>
        <TitleTypo variant="h4">{data.title}</TitleTypo>
        <FlexBox
          style={{
            alignSelf: "center",
            alignItems: "center",
            margin: "auto",
            padding: ".5em 0",
          }}
        >
          <div className="profile" />
          <div>
            <div className="by">Rahul Virani</div>
            <span style={{ marginLeft: "10px" }}>
              {" "}
              <BlogTime blogTimeVariable={data.time} />
            </span>
          </div>
        </FlexBox>
      </TitleContainer>
      <PostImageContainer>
        <img class="cover" src={data.imageURL} alt="someimage" />
      </PostImageContainer>
      <TagContainer>
        <div className="border-top"></div>
        <div className="another-container">
          <Typography>Tags:</Typography>
          {data.tags.map((tag) => {
            return <div className="tags">{tag}</div>;
          })}
        </div>
      </TagContainer>
      <DescriptionContainer>
        <div className="border-top"></div>
        <span>
          Spirals Of Blue Light Appear In New Zealand Sky, Experts Point To
          SpaceX Launch The stargazers in New Zealand were surprised by strange,
          spiralling light formations in the night sky on Sunday night. The
          photos were widely shared on social media, with many New Zealanders
          comparing them to some sort of "wormhole". But experts said these
          "wacky looking clouds" were caused by Falcon 9 rocket carrying a
          Globalstar DM15 satellite. The extraordinary sight was first captured
          by residents of Nelson, a city in New Zealand's North Island, and was
          visible 750 km south to Stewart Island.\n "Does anyone know if there
          was a satellite put into orbit over NZ tonight or maybe an Australian
          satellite, saw something like the picture I posted at about 1920hrs
          tonight looking slightly west at a high elevation Rangiora
          Canterbury," Facebook user Inch Justin posted in Astronomy in New
          Zealand group. \n "The picture I have posted up is just an example of
          what I saw. Didn't manage to get a picture of it just grabbed my binos
          and watched what appeared to be a satellite in the middle of the
          spiral heading north at a great rate of knots," the user further
          said.\n Users flooded the group with comments. "Yes, several of us saw
          it from Hawke's Bay, near the tail of Canis major, then moving north
          east," a user commented.\n "It's definitely cool," said another.\n
          Prof Richard Easther, a physicist at Auckland University, explained
          the reason behind the phenomenon. Clouds of that nature sometimes
          occurred when a rocket carried a satellite into orbit, he told The
          Guardian.\n "When the propellant is ejected out the back, you have
          what's essentially water and carbon dioxide - that briefly forms a
          cloud in space that's illuminated by the sun," Professor Easther said.
          "The geometry of the satellite's orbit and also the way that we're
          sitting relative to the sun - that combination of things was just
          right to produce these completely wacky looking clouds that were
          visible from the South Island." The New Plymouth Astronomical Society
          said on Facebook that it was "most likely a "fuel dump" or "exhaust
          plume" from a SpaceX rocket launch", as similar effects have been seen
          before.\n
        </span>
      </DescriptionContainer>
    </PostContainer>
  );
};
