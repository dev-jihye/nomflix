import { moviesApi, tvApi } from "api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component{
    constructor(props){
        super(props);
        const {
            location: { pathname }
        } = props;
        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        };
    }

    async componentDidMount() {
        const {
            match: {
                params: { id }
            },
            history: { push }
        } = this.props;

        const { isMovie } = this.state;
        const parsedId = Number(id);
        
        if(isNaN(parsedId)){
            return push("/");
        }
        
        let result = null;

        try {
            if(isMovie){
                ({ data: result } = await moviesApi.movieDetail(parsedId));
            } else {
                ({ data: result } = await tvApi.showDetail(parsedId));
            }
        } catch {
            this.setState({ error: "Can't find."})
        } finally {
            this.setState({ loading: false, result });
        }
    }

    render() {
        console.log(this.state);
        return (
            <DetailPresenter {...this.state} />
        )
    }
}