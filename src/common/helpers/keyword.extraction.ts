export function keyWordExtraction(prompt: string): string[] {
    const blackListWords = new Set([
        'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
        'do', 'does', 'did', 'doing',
        'have', 'has', 'had',
        'the', 'a', 'an',
        'and', 'or', 'but', 'if', 'because',
        'of', 'to', 'in', 'on', 'at', 'for', 'with', 'about', 'from',
        'this', 'that', 'these', 'those',
        'what', 'how', 'why', 'when', 'where', 'which',
        'i', 'you', 'he', 'she', 'they', 'we',
        'it', 'its', 'my', 'your', 'our', 'their',
        'can', 'could', 'should', 'would', 'may', 'might',
        'please', 'tell', 'me', 'show',
        'just', 'know', 'mean', 'get', 'want', 'meaning'
    ])
    return prompt.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(word => word.length > 2 || !isNaN(Number(word))).filter(word => word && !blackListWords.has(word));
}