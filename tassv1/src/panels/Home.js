import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderContent from '@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent';
import HeaderContext from '@vkontakte/vkui/dist/components/HeaderContext/HeaderContext';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import List from '@vkontakte/vkui/dist/components/List/List';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import UsersStack from '@vkontakte/vkui/dist/components/UsersStack/UsersStack';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Users from '@vkontakte/icons/dist/24/users';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Article from '@vkontakte/icons/dist/24/article';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';
import Icon24Share from '@vkontakte/icons/dist/24/share';

import connect from '@vkontakte/vk-connect';


import './Home.css';
import {menu} from '../menu'


function hashCode(s) {
    let h;
    for(let i = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;

    return h;
}

function makeWallMessage(data) {
    /* возможный порядок:
    1. шапка с картинкой. Поскольку картинка дублирует заголовок, можно его поставить 
    как альтернативный текст
    2. текст лида
    3. ссылка на источник на сайте tass
    
    но пока так
    */
    return data.intro + "<img src="+data.preview+"/>";
}

function sharePost(data) {
    return data.url;
}

const Material = ({id, data}) => {

    const [expanded, setExpanded] = useState(false);

    /*const postAtWall = event => connect.send("VKWebAppShowWallPostBox", {"message": makeWallMessage(data)});*/
    const shareUrl = event => connect.send("VKWebAppShare", {"link": sharePost(data)});

    return (
        <div>
            <div className="collapsible">
                <img src={data.preview} className="preview-pic" onClick={() => {
                    setExpanded(!expanded);
                    console.log(expanded);
                }}/>

                <div className="intro" style={{height: expanded ? "auto" : "0"}}>
                    <Div>
                        <p>{data.intro}</p>


                    </Div>
                    <Div style={{display: 'flex'}}>
                        <Button size="xl" stretched style={{ marginRight: 8 }} onClick={e => window.open(data.url, "_blank")}>
                            Читать
                        </Button>
                        <Button size="xl" level="secondary" onClick={shareUrl} data-url={data.url}><Icon24Share/></Button>
                    </Div>
                </div>
            </div>

        </div>
    )
};


const Materials = ({mode}) => {
    const items = []

    const filteredMenu = mode === 'all' ? menu : menu.filter(item => item.categories.includes(mode));

    for (const [index, value] of filteredMenu.entries()) {
        items.push(<Material data={value} key={index}/>)
    }

    return (
        <div>
            {items}
        </div>
    );
};

const Home = ({id, go, fetchedUser}) => {
    const [contextOpened, setContextOpened] = useState(false);
    const [category, setCategory] = useState('all');
    const toggleContext = () => setContextOpened(!contextOpened);
    const select = (e) => {
        const category = e.currentTarget.dataset.category;
        setCategory(category);
        requestAnimationFrame(toggleContext);
    };

    const categories = [... new Set(menu.flatMap(x => x.categories))].sort();

    return (
        <Panel id={id}>
            {/*{fetchedUser &&*/}
            {/*<Group title="User Data Fetched with VK Connect">*/}
            {/*    <Cell*/}
            {/*        before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}*/}
            {/*        description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}*/}
            {/*    >*/}
            {/*        {`${fetchedUser.first_name} ${fetchedUser.last_name}`}*/}
            {/*    </Cell>*/}
            {/*</Group>}*/}

            <PanelHeader>
                <PanelHeaderContent aside={<Icon16Dropdown />} onClick={toggleContext}>
                    {category === 'all' ? 'Все темы' : category}
                </PanelHeaderContent>
            </PanelHeader>
            <HeaderContext opened={contextOpened} onClose={toggleContext}>
                <List>
                    <Cell
                        before={<Icon24Article />}
                        // asideContent={category === 'all' ? <Icon24Done fill="var(--accent)" /> : null}
                        onClick={select}
                        data-category='all'
                    > Все </Cell>
                    {
                        categories.map(category => (
                            <Cell
                                key={hashCode(category)}
                                before={<Icon24Article />}
                                // asideContent={category === 'all' ? <Icon24Done fill="var(--accent)" /> : null}
                                onClick={select}
                                data-category={category}
                            >
                                {category}
                            </Cell>
                        ))
                    }
                </List>
            </HeaderContext>

            <Group title="Твоя подборка материалов">
                <Div>
                    <Materials mode={category} />
                </Div>
            </Group>
        </Panel>
    )
};


Home.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Home;
