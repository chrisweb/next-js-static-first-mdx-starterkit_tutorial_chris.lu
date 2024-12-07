// presets imports
import remarkPresetLintRecommended from 'remark-preset-lint-recommended'
import remarkPresetLintConsistent from 'remark-preset-lint-consistent'
import remarkPresetLintMarkdownStyleGuide from 'remark-preset-lint-markdown-style-guide'

// rules imports
import remarkLintMaximumHeadingLength from 'remark-lint-maximum-heading-length'
import remarkLintUnorderedListMarkerStyle from 'remark-lint-unordered-list-marker-style'
import remarkLintNoUndefinedReferences from 'remark-lint-no-undefined-references'
import remarkLintLinkTitleStyle from 'remark-lint-link-title-style'
import remarkLintMaximumLineLength from 'remark-lint-maximum-line-length'
import remarkLintListItemSpacing from 'remark-lint-list-item-spacing'

const config = {
    plugins: [
        // the presets
        remarkPresetLintRecommended,
        remarkPresetLintConsistent,
        remarkPresetLintMarkdownStyleGuide,
        // and then the rules customizations
        // https://www.npmjs.com/package/remark-lint-maximum-heading-length
        [remarkLintMaximumHeadingLength, [1, 100]],
        // https://www.npmjs.com/package/remark-lint-unordered-list-marker-style
        [remarkLintUnorderedListMarkerStyle, 'consistent'],
        // https://www.npmjs.com/package/remark-lint-no-undefined-references
        [remarkLintNoUndefinedReferences, { allow: ['!NOTE', '!TIP', '!IMPORTANT', '!WARNING', '!CAUTION', ' ', 'x'] }],
        // https://www.npmjs.com/package/remark-lint-link-title-style
        [remarkLintLinkTitleStyle, '\''],
        // https://www.npmjs.com/package/remark-lint-maximum-line-length
        [remarkLintMaximumLineLength, false],
        // https://www.npmjs.com/package/remark-lint-list-item-spacing
        [remarkLintListItemSpacing, false],
    ]
}

export default config