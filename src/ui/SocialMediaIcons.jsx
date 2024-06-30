// library imports
import { IconContainer, IconLink, Icon } from "../styles/SocialMediaIconStyles";

// images
import google from "../assets/images/google.png";
import twitchRound from "../assets/images/twitch-round.png";
import twitterRound from "../assets/images/twitter-round.png";
import instagramRound from "../assets/images/instagram-round.png";

function SocialMediaIcons() {
  return (
    <IconContainer>
      <IconLink to="/signup">
        <Icon src={google} alt="Google" />
      </IconLink>
      <IconLink to="/signup">
        <Icon src={twitchRound} alt="Twitch" />
      </IconLink>
      <IconLink to="/signup">
        <Icon src={twitterRound} alt="X" />
      </IconLink>
      <IconLink to="/signup">
        <Icon src={instagramRound} alt="X" />
      </IconLink>
    </IconContainer>
  );
}

export default SocialMediaIcons;
