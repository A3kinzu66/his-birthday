import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Heart, Sparkles, ArrowLeft, ArrowRight, X,
  Volume2, VolumeX, Moon, Star, Mail, Camera,
  Gift, Music2
} from 'lucide-react';

import {
  recipient, sender, rooms, messages,
  archivePhotos, finalLetter
} from './content';

import './style.css';

function App() {
  const [page, setPage] = useState('opening');

  const [visited, setVisited] = useState(() =>
    JSON.parse(localStorage.getItem('aaruuu-visited') || '[]')
  );

  const [candles, setCandles] = useState([true, true, true]);
  const [revealed, setRevealed] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [wish, setWish] = useState(false);
  const [hug, setHug] = useState(false);
  const [sound, setSound] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('aaruuu-visited', JSON.stringify(visited));
  }, [visited]);

  const goRoom = id => {
    setPage(id);
    setVisited(v => v.includes(id) ? v : [...v, id]);
    window.scrollTo(0, 0);
  };

  const back = target => {
    setPage(target);
    window.scrollTo(0, 0);
  };

  const allVisited = rooms.every(r => visited.includes(r.id));

  const toggleReveal = id => {
    setRevealed(v =>
      v.includes(id)
        ? v.filter(x => x !== id)
        : [...v, id]
    );
  };

  return (
    <div className="app-shell">

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <button className="brand" onClick={() => back('opening')}>
          ♡ a tiny universe
        </button>

        <div className="top-actions">
          <span className="for-label">
            made for {recipient}
          </span>

          <button
            className="icon-btn"
            title="Music toggle"
            onClick={() => setSound(!sound)}
          >
            {sound ? <Volume2 /> : <VolumeX />}
          </button>
        </div>
      </header>

      {/* OPENING PAGE */}

      {page === 'opening' && (
        <main className="opening page-wrap">

          <div className="night-sky">
            <span className="big-star">✦</span>

            {Array.from({ length: 22 }, (_, i) => (
              <i key={i} className="twinkle" style={{ '--i': i }}>
                {i % 3 === 0 ? '✧' : '·'}
              </i>
            ))}
          </div>

          <p className="eyebrow">
            a little something, just for you
          </p>

          <h1 className="opening-title">
            Some people make the world
            <br />
            <em>a little less ordinary...</em>
          </h1>

          <p className="opening-sub">
            And some people become an entire universe of their own.
          </p>

          <div className="curtain-stage">

            <div className="curtain curtain-left">✿</div>
            <div className="curtain curtain-right">✿</div>

            <div className="birthday-reveal">

              <span className="tiny-crown">♕</span>

              <div className="name-script">
                {recipient}
              </div>

              <h2>Happy Birthday!</h2>

              <p>today, the universe celebrates you</p>

              <div className="cake" aria-label="Birthday cake">

                <div className="candles">
                  {candles.map((on, i) => (
                    <button
                      key={i}
                      className={`candle ${on ? 'lit' : ''}`}
                      onClick={() =>
                        setCandles(v =>
                          v.map((x, j) => j === i ? !x : x)
                        )
                      }
                      title="Blow out a candle"
                    >
                      <span className="flame">✦</span>
                      <i />
                    </button>
                  ))}
                </div>

                <div className="cake-top" />

                <div className="cake-body">
                  <span>♡</span>
                  <span>♡</span>
                  <span>♡</span>
                </div>

                <div className="cake-plate" />

              </div>

              <p className="candle-hint">
                tap the little flames to make a wish
              </p>

            </div>
          </div>

          <div className="opening-note">
            <span className="note-spark">✧</span>

            <p className="hinglish">
              Tum mere liye saanson jitna zaruri ho and mujhe bilkul ni mann ab tumhare baigar apna ek kadam bhi chaluu
            </p>

            <p className="note-small">
              Okay, enough emotions for now... hehe ♡
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() => back('museum')}
          >
            Enter our little world <Heart size={17} />
          </button>

          <p className="tiny-foot">
            a museum of moments, made with love
          </p>

        </main>
      )}

      {/* MUSEUM */}

      {page === 'museum' && (
        <main className="page-wrap museum-page">

          <div className="section-kicker">
            ✦ THE LITTLE MUSEUM ✦
          </div>

          <h1 className="display-title">
            Welcome to our
            <br />
            <em>little universe.</em>
          </h1>

          <p className="intro-copy">
            Welcome to the museum of someone who makes ordinary days extraordinary.
            <br />
            Every little corner here holds a piece of you, a piece of us,
            and a few things I never want to forget.
          </p>

          <div className="museum-banner">
            <span>☁</span>

            <div>
              <b>Take your time, Aaruuu.</b>
              <small>
                There is no right order. Wander wherever your heart takes you.
              </small>
            </div>

            <span>☁</span>
          </div>

          <div className="room-grid">
            {rooms.map(r => (
              <button
                className={`room-card room-${r.id} ${
                  visited.includes(r.id) ? 'visited' : ''
                }`}
                key={r.id}
                onClick={() => goRoom(r.id)}
              >
                <div className="room-card-top">
                  <span className="room-icon">{r.icon}</span>
                  <span className="room-number">{r.number}</span>
                </div>

                <h2>{r.title}</h2>
                <p>{r.subtitle}</p>

                <span className="room-enter">
                  {visited.includes(r.id)
                    ? 'visit again ↗'
                    : 'open this room ↗'}
                </span>
              </button>
            ))}
          </div>

          <div className="museum-bottom">

            <span>{visited.length} of 5 rooms explored</span>

            <div className="progress-track">
              <i style={{ width: `${visited.length * 20}%` }} />
            </div>

            <p>
              {allVisited
                ? 'You found every little corner. One last thing is waiting for you.'
                : 'The secret letter will find you when you have explored all five rooms.'}
            </p>

            <button
              className="secondary-btn"
              disabled={!allVisited}
              onClick={() => back('letter')}
            >
              {allVisited
                ? 'Open the secret letter ♡'
                : 'A little secret is still tucked away'}
            </button>

          </div>
        </main>
      )}

      {/* ROOM 1: THE BEGINNING */}

      {page === 'beginning' && (
        <RoomLayout room={rooms[0]} back={() => back('museum')}>

          <div className="cozy-scene beginning-scene">

            <div className="window-art">
              <span>☾</span>
              <i>✦ ✧</i>
            </div>

            <div className="mailbox" onClick={() => toggleReveal('mail')}>
              <Mail />
              <span>you've got mail</span>
            </div>

            <div className="letter-paper">
              <div className="paper-stamp">♡</div>
              <p className="paper-label">THE FIRST MESSAGE</p>
              <h2>And then, a little hello...</h2>
              <p>{messages.beginning}</p>
              <div className="paper-sign">always, ♡</div>
            </div>

            <div className="scene-flower">✿</div>

          </div>

          <p className="room-instruction">
            A tiny message changed the shape of ordinary days.
          </p>

        </RoomLayout>
      )}

      {/* ROOM 2: THE LITTLE THINGS */}

      {page === 'little-things' && (
        <RoomLayout room={rooms[1]} back={() => back('museum')}>

          <p className="room-lead">
            It's never just the big things. Sometimes it's the smallest,
            silliest things that make a person feel like home.
          </p>

          <div className="playroom">

            <button className="object monkey" onClick={() => toggleReveal('monkey')}>
              <span>🐒</span>
              <b>the little monkey</b>
            </button>

            <button className="object lamp" onClick={() => toggleReveal('lamp')}>
              <span>💡</span>
              <b>your little light</b>
            </button>

            <button className="object heart-object" onClick={() => toggleReveal('heart')}>
              <span>💗</span>
              <b>the soft spot</b>
            </button>

            <button className="object star-object" onClick={() => toggleReveal('star')}>
              <span>⭐</span>
              <b>your sparkle</b>
            </button>

            <div className="soft-cloud">☁</div>
            <div className="playroom-rug" />

          </div>

          <div className="reveal-grid">

            {[
              ['monkey', 'A certified silly goose', 'I really love when u behave like a monkey to make me laugh.'],
              ['lamp', 'A little light', 'My life lits up seeing u live your life to the fullest.'],
              ['heart', 'A tender thought', 'It heals some part of me seeing you enjoy life after all that nonsense life threw upon u.'],
              ['star', 'A wish for you', 'Please never let the shine fAde away ..']
            ].map(([id, title, copy]) =>
              revealed.includes(id) && (
                <div className="reveal-note" key={id}>
                  <button onClick={() => toggleReveal(id)}>
                    <X size={14} />
                  </button>
                  <b>{title}</b>
                  <p>{copy}</p>
                </div>
              )
            )}

          </div>

          <p className="room-instruction">
            Tap the little things around the room. They have something to tell you.
          </p>

        </RoomLayout>
      )}

      {/* ROOM 3: THE ARCHIVES */}

      {page === 'archives' && (
        <RoomLayout room={rooms[2]} back={() => back('museum')}>

          <p className="room-lead">
            Some moments are too precious to leave to memory alone.
            These little frames are waiting for your photographs.
          </p>

          <div className="scrapbook">

            {archivePhotos.map((p, i) => (
              <button
                className={`polaroid polaroid-${i % 4}`}
                key={i}
                onClick={() => setPhoto(p)}
              >

                <div className="photo-placeholder">

                  {p.src ? (
                    <img src={p.src} alt={p.caption} />
                  ) : (
                    <>
                      <Camera />
                      <span>your photo goes here</span>
                      <small>
                        photo {String(i + 1).padStart(2, '0')}
                      </small>
                    </>
                  )}

                </div>

                <span className="polaroid-caption">
                  {p.caption}
                </span>

              </button>
            ))}

          </div>

          <div className="edit-hint">
            ♡ To add your pictures: put image files in
            <code> public/photos/ </code> and add their paths in
            <code> src/content.js</code>.
          </div>

        </RoomLayout>
      )}

      {/* ROOM 4: THE UNFORGETTABLE */}

      {page === 'unforgettable' && (
        <RoomLayout room={rooms[3]} back={() => back('museum')}>

          <div className="memory-night">

            <div className="moon-art">☾</div>
            <div className="twelve">12</div>
            <p className="golden">GOLDEN DAYS</p>
            <div className="memory-stars">✦　✧　·　✦　✧</div>
            <div className="patronus">🐈‍⬛</div>

            <p className="cat-caption">
              a little guardian of our brightest memories
            </p>

          </div>

          <div className="letter-paper wide-paper">
            <p>{messages.unforgettable}</p>
            <div className="paper-sign">
              some memories stay golden. ♡
            </div>
          </div>

          <p className="room-instruction">
            If happiness had a shape, maybe it would look a little like this.
          </p>

        </RoomLayout>
      )}

      {/* ROOM 5: THE FUTURE */}

      {page === 'future' && (
        <RoomLayout room={rooms[4]} back={() => back('museum')}>

          <div className="future-window">

            <div className="crescent">☾</div>
            <div className="wish-stars">✦ ✧ · ✦ · ✧ ✦</div>

            <div className="wish-jar">
              <div className="jar-lid" />

              <div className="jar-body">
                {Array.from({ length: 9 }, (_, i) => (
                  <span key={i} style={{ '--j': i }}>✦</span>
                ))}
              </div>
            </div>

            <button className="wish-btn" onClick={() => setWish(!wish)}>
              {wish
                ? 'A wish is floating somewhere ✨'
                : 'Tap to release a little wish'}
            </button>

          </div>

          <div className="letter-paper wide-paper">
            <p>{messages.future}</p>
            <div className="paper-sign">with hope, ♡</div>
          </div>

          {wish && (
            <div className="wish-message">
              Whatever tomorrow brings, I hope life is always gentle with you. ♡
            </div>
          )}

          <p className="room-instruction">
            A little wish jar for all the beautiful things still to come.
          </p>

        </RoomLayout>
      )}

      {/* SECRET LETTER */}

      {page === 'letter' && (
        <main className="page-wrap letter-page">

          <button className="back-link" onClick={() => back('museum')}>
            <ArrowLeft size={16} /> back to the museum
          </button>

          <div className="section-kicker">✦ ONE LAST THING ✦</div>

          <h1 className="display-title">
            A letter, just
            <br />
            <em>for you.</em>
          </h1>

          <div className="envelope-wrap">

            <button
              className={`envelope ${letterOpen ? 'opened' : ''}`}
              onClick={() => setLetterOpen(!letterOpen)}
            >
              <div className="envelope-flap" />
              <div className="wax-seal">♥</div>
              <span>
                {letterOpen ? 'a little love, unfolded' : 'tap to open'}
              </span>
            </button>

          </div>

          {letterOpen && (
            <article className="letter-paper final-letter">
              <p className="paper-label">
                A NOTE FOR {recipient.toUpperCase()}
              </p>

              <p className="preserve-lines">{finalLetter}</p>
            </article>
          )}

          <p className="room-instruction">
            Some words are meant to be opened slowly.
          </p>

        </main>
      )}

      {/* GOODNIGHT PAGE */}

      {page === 'goodnight' && (
        <main className="page-wrap goodnight-page">

          <div className="goodnight-sky">
            ☾　✦　·　✧　✦
          </div>

          <div className="sleepy-cat">🐈</div>

          <p className="section-kicker">
            THE END OF THIS LITTLE VISIT
          </p>

          <h1 className="display-title">
            Well, that's all for today,
            <br />
            <em>birthday human.</em>
          </h1>

          <p className="intro-copy">
            I hope you found a little happiness tucked inside this tiny universe.
            <br />
            Happy Birthday, once again. ♡
          </p>

          <div className="exit-card">
            <span>✿</span>
            <p>
              Some memories don't need a place to stay.
              <br />
              They simply find a home in us.
            </p>
            <small>Made with a little too much love. ♡</small>
          </div>

          <button
            className="primary-btn"
            onClick={() => back('museum')}
          >
            Visit our little world again <Heart size={17} />
          </button>

          <button className="text-btn" onClick={() => setHug(!hug)}>
            Keep this little universe close ♡
          </button>

          {hug && (
            <p className="hug-message">
              Sending you the biggest, warmest hug. Always. ♡
            </p>
          )}

        </main>
      )}

      {/* PHOTO LIGHTBOX - FIXED */}

      {photo && (
        <div
          className="lightbox"
          onClick={() => setPhoto(null)}
        >

          <button
            className="lightbox-close"
            onClick={() => setPhoto(null)}
            aria-label="Close photo"
          >
            <X />
          </button>

          <div
            className="lightbox-card"
            onClick={e => e.stopPropagation()}
          >

            <div className="lightbox-image">

              {photo.src ? (
                <img
                  src={photo.src}
                  alt={photo.caption}
                />
              ) : (
                <>
                  <Camera />
                  <span>Your photo will appear here</span>
                </>
              )}

            </div>

            <p>{photo.caption}</p>

          </div>

        </div>
      )}

      {/* FOOTER */}

      <footer className="site-footer">
        made with a little too much love
        <Heart size={12} fill="currentColor" />
        for {recipient}
      </footer>

    </div>
  );
}

/* REUSABLE ROOM LAYOUT */

function RoomLayout({ room, back, children }) {
  return (
    <main className="page-wrap room-page">

      <button className="back-link" onClick={back}>
        <ArrowLeft size={16} /> back to the museum
      </button>

      <div className="room-heading">
        <span>{room.number} · {room.icon}</span>
        <h1 className="display-title">{room.title}</h1>
        <p>{room.subtitle}</p>
      </div>

      {children}

      <div className="room-next">
        <span>✧ take this memory with you ✧</span>

        <button onClick={back}>
          Return to the museum <ArrowRight size={16} />
        </button>
      </div>

    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);