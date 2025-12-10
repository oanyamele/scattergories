// babel.config.js
module.exports = {
  // 'presets' tell Babel what transformations to apply
  presets: [
    // Transforms modern JavaScript features (e.g., const, let, arrows)
    '@babel/preset-env',
    
    // This is the CRUCIAL preset that enables JSX transformation
    '@babel/preset-react' 
  ],
};