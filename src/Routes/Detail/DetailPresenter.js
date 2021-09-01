import React, {useState} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import logo from "../../assets/Logo.png"

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
`;

const Cover = styled.div`
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.h3`
    font-size: 32px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span`

`;

const Link = styled.a`
    
`;

const Img = styled.img`
    width: 35px;
    position: relative;
    top: 4px;
`;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;

const ListContainer = styled.ul`
    display: flex;
    margin-top: 30px;
`;

const List = styled.li`
    padding: 20px 30px;
    background-color: ${props => props.selected ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.3)"};
    border-radius: 5px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    margin-right: 5px;
    cursor: pointer;
`;

const Bg = styled.div`
    background-color: rgba(0, 0, 0, 0.7);
    padding: 20px;
`;

const Video = styled.div`
`;

const Iframe = styled.iframe`
    margin-bottom: 10px;
`;

const Span = styled.p`
    margin: 10px 0;
`;

const Poster = styled.div`
    display: inline-block;
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    min-height: 300px;
    border-radius: 5px;
    margin: 10px;
    margin-bottom: 20px;
    position: relative;
`;

const PosterTitle = styled.div`
    position: absolute;
    bottom: -20px;
`;

const useTab = (initTab) => {
    const [tab, setTab] = useState(initTab);
    return {tab, setTab};
}

const DetailPresenter = ({result, loading, error, isMovie}) => {
    const {tab, setTab} = useTab("video");

    return (
        loading ? (
            <>
            <Helmet>
                <title>Loading | Nomflix</title>
            </Helmet>
            <Loader />
            </>
        ) : (
            <Container>
                <Helmet>
                    <title>
                        {result.original_title ? result.original_title : result.original_name}{" "} | Nomflix
                    </title>
                </Helmet>
                <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
                <Content>
                    <Cover bgImage={
                        result.poster_path 
                            ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                            : require("../../assets/noPosterSmall.png")
                        } 
                    />
                    <Data>
                        <Title>
                            {result.original_title 
                                ? result.original_title 
                                : result.original_name}
                        </Title>
                        <ItemContainer>
                            <Item>
                                {result.release_date 
                                    ? result.release_date.substring(0, 4) 
                                    : result.first_air_date.substring(0, 4)}
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                                {result.runtime 
                                    ? result.runtime 
                                    : result.episode_run_time[0]} min
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                                {result.genres && result.genres.map((genre, index) => 
                                    index === result.genres.length - 1 ? genre.name : `${genre.name} / `
                                )} 
                            </Item>
                            <Divider>•</Divider>
                            <Link target="_blank" href={`https://imdb.com/title/` + result.imdb_id}><Img src={logo}></Img></Link>
                        </ItemContainer>
                        <Overview>{result.overview}</Overview>
                        <div>
                            <ListContainer>
                                <List selected={tab === "video"} onClick={()=>{setTab("video")}}>
                                    Video
                                </List>
                                <List selected={tab === "production"} onClick={()=>{setTab("production")}}>
                                    Production
                                </List>
                                {!isMovie && <List selected={tab === "seasons"} onClick={()=>{setTab("seasons")}}>
                                    Seasons
                                </List>}
                            </ListContainer>
                            <Bg>
                                {tab === "video" && <Video>
                                    {result.videos.results && result.videos.results.map((video, index) => (
                                        video.key ? <Iframe key={index} width="560" height="315" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></Iframe> : "n"
                                    ))}
                                </Video>}
                                {tab === "production" && <div>Company : 
                                    {result.production_companies && result.production_companies.map((company, index) => (
                                        company.name && <Span key={index}>{company.name} </Span>
                                    ))}Country : 
                                    {result.production_countries && result.production_countries.map((country, index) => (
                                        country.name && <Span key={index}>{country.name} </Span>
                                    ))}
                                </div>}
                                {tab === "seasons" && <div>
                                    {result.seasons && result.seasons.map((season, index) => (
                                        <Poster key={index} bgImage={season.poster_path ? `https://image.tmdb.org/t/p/original${season.poster_path}` : require("../../assets/noPosterSmall.png")}><PosterTitle>{season.name}</PosterTitle></Poster> 
                                    ))}
                                </div>}
                            </Bg>
                        </div>
                    </Data>
                </Content>
            </Container> 
        )
    )
};

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default DetailPresenter;