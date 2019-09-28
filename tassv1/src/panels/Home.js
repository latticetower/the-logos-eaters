import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import UsersStack from '@vkontakte/vkui/dist/components/UsersStack/UsersStack';

import './Home.css';

const menu = [
    {
        url: "https://luna-2.tass.ru/",
        categories: ['Культура', 'История'],
        name: "Луна. Первый контакт",
        preview: "https://luna-2.tass.ru/shares/fb.png",
        intro: "Начало освоению спутника Земли положила «Луна-2». В 1959 году советская станция стала первым искусственным аппаратом, достигшим поверхности Луны. После этого наступило время больших открытий: запуск первых автоматических станций, первый луноход и первая высадка человека на Луну. Потом полёты к Луне на некоторое время прекратились, но сейчас внимание человечества снова обращено к ней. Мы изучили все лунные миссии: от первого успеха «Луны-2» и программы Apollo до планов новых экспедиций и строительства лунных баз."
    },
    {
        url: "https://monstry.tass.ru/",
        categories: ['Культура', 'История'],
        name: "Бестиарий: 10 эпических монстров России",
        preview: "https://rm-content.s3.amazonaws.com/57f773462aa31a0078116425/upload-72efc906-68ad-48eb-8e6e-872c2598c161.png",
        intro: "Мы собрали чудовищ из разных регионов нашей страны. Они различаются по происхождению, среде обитания, внешнему виду и способностям. Единственное, что их объединяет, — колоссальные размеры."
    }
];


const Material = ({id, data}) => {

    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <div className="collapsible" >
                <img src={data.preview} className="preview-pic" onClick={() => {setExpanded(!expanded); console.log(expanded);} }/>

                <div className="intro" style={{height: expanded ? "auto" : "0"}}>
                    <Div>
                        <p>{data.intro}</p>

                        <Button size="xl" level="secondary" onClick={e => window.open(data.url, "_blank")}>
                            Читать
                        </Button>

                        <UsersStack
                            photos={[
                                'https://sun9-1.userapi.com/c850624/v850624456/9f63e/c2_IbBit7I8.jpg?ava=1',
                                'https://sun9-6.userapi.com/c851528/v851528416/e0360/1UfQ8aSIGVA.jpg?ava=1'
                            ]}
                            size="m"
                        >Твоим друзья уже понравилось</UsersStack>

                    </Div>
                </div>
            </div>

        </div>
    )
};


const getMaterials = () => {
    const items = []

    for (const [index, value] of menu.entries()) {
        items.push(<Material data={value} key={index}/>)
    }

    return (
        <div>
            {items}
        </div>
    );
};

const Home = ({id, go, fetchedUser}) => {
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

            <Group title="Твоя подборка материалов">
                <Div>
                    {getMaterials()}
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
