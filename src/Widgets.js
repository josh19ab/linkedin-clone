import React from 'react';
import './Widgets.css';
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function Widgets() {
  const newsArticle = (heading, subtitle) => {
    return (
      <div className="widgets__article">
        <div className="widegets__articleleft">
          <FiberManualRecordIcon />
        </div>

        <div className="widgets__articleright">
          <h4>{heading}</h4>
          <p>{subtitle}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="widgets">
      <div className="widgets_header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>

      {newsArticle("India's solar sector shines bright", "Top news")}
      {newsArticle("FMCG demand to plummet", "1d ago")}
      {newsArticle("India takes lead in GRE", "2d ago")}
      {newsArticle("India's GDP in growth path", "18h ago")}
      {newsArticle("Smaller OTT players go big ", "2d ago")}
      {newsArticle("Which sectors are hiring", "2d ago")}
      {newsArticle("Top skills for tech freshers", "1d ago")}
    </div>
  );
}

export default Widgets;