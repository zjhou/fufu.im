import React from 'react';
import {  Flex, Box  } from 'grid-styled';
import PropTypes from 'prop-types';
import './style.scss';
import Nav from '../../static-com/Nav/Nav';
import {getBlogConfig, getNavItems, getPosts} from '../../../service/BlogApi';
import Post from '../../static-com/Post/Post';
import Spinner from '../../static-com/Spinner/Spinner';
import PageNav from '../../static-com/PageNav/PageNav';

const Head =
    (props) => {
        return (
            <React.Fragment>
                <span className="blog-title high-light">
                    {props.title}
                </span><br/>
                <span className="email high-light">
                    {props.email}
                </span>
            </React.Fragment>
        );
    };

Head.propTypes = {
    title: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};
export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingPosts: true,
            blogConfig: {},
            navItems: [],
            activePostsType: props.activePostsType || '',
            posts: {},
            pagenow: 1,
        };
        this.loadPosts = this.loadPosts.bind(this);
    }

    async componentDidMount() {
        let blogConfig = await getBlogConfig();
        let navItems = await getNavItems();
        let posts = await getPosts(blogConfig.defaultType, this.state.pagenow);
        this.setState({
            blogConfig: blogConfig,
            activePostsType: blogConfig.defaultType,
            navItems: navItems,
            posts: posts,
            loading: false,
            loadingPosts: false
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.blogConfig !== this.state.blogConfig)
            || (nextState.loading !== this.state.loading)
            || (nextState.loadingPosts !== this.state.loadingPosts)
            || (nextState.pagenow !== this.state.pagenow)
            || (nextState.navItems !== this.state.navItems)
            || (nextProps !== this.props)
            || (nextState.activePostsType !== this.state.activePostsType)
            || (nextState.posts !== this.state.posts);
    }

    async loadPosts (type, pagenow) {
        this.setState({loadingPosts: true});
        let posts = await getPosts(type, pagenow);
        this.setState({
            loadingPosts: false,
            posts: posts
        });
    }
    async componentDidUpdate(prevProps, prevState) {
        if(this.state.activePostsType !== prevState.activePostsType ||
                prevProps.activePostsType !== this.props.activePostsType
        ) {
            await this.loadPosts(this.state.activePostsType, this.state.pagenow);
        }
    }

    render() {
        if(this.state.loading){
            return <Spinner/>;
        }
        return (
            <div className="blog">
                <header>
                    <Flex>
                        <Box width={100/960}/>
                        <Box width={860/960}>
                            <Head {...this.state.blogConfig}/>
                        </Box>
                    </Flex>
                </header>
                <main>
                    <Flex>
                        <Box width={100/960}/>
                        <Box width={314/960}>
                            <Nav
                                navItems={this.state.navItems}
                                activeType={this.state.activePostsType}
                                onChange={(type) => {
                                    this.setState({
                                        activePostsType: type,
                                        pagenow: 1
                                    });
                                }}
                            />
                        </Box>
                        <Box width={280/960}>
                            <section data-loading={this.state.loadingPosts}>
                                {this.state.posts.list.map((post, index) =>
                                    <Post {...post} key={index}/>
                                )}
                            </section>
                            {(this.state.posts.prevPage || this.state.posts.nextPage) &&
                                <PageNav
                                    {...this.state.posts}
                                    onClick={async (pagenow) => {
                                        await this.loadPosts(this.state.activePostsType, pagenow);
                                        this.setState({pagenow: pagenow});
                                    }}
                                />
                            }
                        </Box>
                        <Box width={276/960}/>
                    </Flex>
                </main>
            </div>
        );
    }
}

Blog.propTypes = {
    activePostsType: PropTypes.string
};
