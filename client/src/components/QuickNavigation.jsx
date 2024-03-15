import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import _nav from '../_nav';

const QuickNavigation = () => {
    const { pathname, state } = useLocation();
    const navigate = useNavigate();
    const [tempArray, setTempArray] = useState([]);
    const tempParentGroup = useRef();

    const fetchData = (pathName) => {
        if (state && (state.parentGroup)) {
            const filterParent = (_nav && state.parentGroup)
                ? _nav
                    .filter((item) => pathName ? item.name === pathName : item.name === state.parentGroup)
                    .flatMap((item) => (item.items ? item.items : []))
                : [];
            setTempArray(filterParent);
            tempParentGroup.current = state.parentGroup;
        }
    };

    const getList = (navData, parentListName) => {
        let result = [];
        if (navData.length > 0) {
            navData.forEach(item => {
                if (item.name.trim() === parentListName.trim()) {
                    // if Found the parent list, return its items
                    result = item.items || [];
                } else if (item.items) {
                    // Recursively func for the parent list in sub-items
                    const subResult = getList(item.items, parentListName);
                    if (subResult.length > 0) {
                        result = subResult;
                    }
                }
            });
        }
        return result;
    }

    const getPathName = (navData, urlPath) => {
        let pathName = '';
        let resultList = [];

        const findName = (data, path) => {
            for (const item of data) {
                if ((item.to) && (item.to === path)) {
                    pathName = item.name;
                    break;
                } else if ((item.navPath) && (item.navPath === path)) {
                    pathName = item.name;
                    break;
                } else if (item.items) {
                    findName(item.items, path);
                }
            }
        };

        findName(navData, urlPath);

        if (pathName !== null) {
            if (navData.length > 0) {
                navData.forEach(item => {
                    if (item.name.trim() === pathName.trim()) {
                        // if Found the parent list, return its items
                        resultList = item.items || [];
                    } else if (item.items) {
                        // Recursively func for the parent list in sub-items
                        const subResult = getList(item.items, pathName);
                        if (subResult.length > 0) {
                            resultList = subResult;
                        }
                    }
                });
            }
            return resultList;
        }
    };


    useEffect(() => {
        fetchData();
    }, [state]);

    useEffect(() => {
        if (pathname && (!state)) {
            setTempArray(getPathName(_nav, pathname))
        }
    }, [pathname])


    const navigateToNext = (value) => {
        let temp = [];
        if (value) {
            temp = getList(_nav, value.name);
            if (temp.length > 0) {
                setTempArray(temp);
            }
            navigate(value.to);
        }
    }


    return (
        <Row className='quick-navigation'>
            {(tempArray && (tempArray?.length > 0)) && tempArray.map((item) => (
                <Col md={2} className='navigation-layput' key={item.name}>
                    <Card
                        className='card-layout'
                        onClick={item.to ? () => navigateToNext(item) : []}
                    >
                        <Card.Header className='text-center py-3 border-0'>
                            {item?.quicknavicon}
                        </Card.Header>
                        <Card.Body className='d-flex justify-content-center align-items-center pt-0 pb-3'>
                            <Card.Title className='card-title'>{item.name}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default QuickNavigation;