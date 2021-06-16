import {
  IonContent, IonHeader, IonPage,
  IonTitle, IonCard, IonToolbar, IonCardTitle, IonCardHeader, IonCardSubtitle
} from '@ionic/react';
import React, { useState, useRef, useEffect } from 'react';
import items from '../json/alunos.json';

import './ExploreContainer.css';

const ExploreContainer = () => {
  const contentRef = useRef(null);
  const scrollRef = useRef(null);

  const [listlenght, setListLenght] = useState(10);
  const newList = items.slice(0, listlenght);
  const [list, setList] = useState(newList);

  const [scrollRadio, setScrollRadio] = useState(null);

  const intersectionObserver = new IntersectionObserver((entries) => {
    const radio = entries[0].intersectionRatio;
    setScrollRadio(radio);
    return
  })

  useEffect(() => {
    intersectionObserver.observe(scrollRef.current);
    return () => {
      intersectionObserver.disconnect();
    }
  }, []);

  useEffect(() => {
    if (scrollRadio > 0) {
      var actualListLenght = listlenght;
      var nextListLenght = actualListLenght + 10;
      var searchArray = items.slice(actualListLenght, nextListLenght);

      setList(preventValue => [...preventValue, ...searchArray]);
      setListLenght(nextListLenght);
    }
  }, [scrollRadio])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab One</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        scrollEvents={true}>
        {
          list.map((item, i) => {
            return <IonCard key={`${i}`}>
              <IonCardHeader>
                <IonCardSubtitle color="success">Id: {item.id}</IonCardSubtitle>
                <IonCardTitle color="primary">Nome: {item.nome} {item.sobrenome}</IonCardTitle>
                <IonCardSubtitle>E-mail: {item.email}</IonCardSubtitle>
                <IonCardSubtitle>Idade: {item.idade}</IonCardSubtitle>
                <IonCardSubtitle>Ra: {item.ra}</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          })
        }
        <div className="observe" ref={scrollRef}></div>
      </IonContent>
    </IonPage>

  );
};

export default ExploreContainer;
