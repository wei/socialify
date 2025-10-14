import { LANGUAGE_ICON_MAPPING } from './languageMapping'

describe('LANGUAGE_ICON_MAPPING', () => {
  it('should include MCP icon in the mapping', () => {
    expect(LANGUAGE_ICON_MAPPING).toHaveProperty('MCP')
  })

  it('should have valid MCP icon with correct properties', () => {
    const mcpIcon = LANGUAGE_ICON_MAPPING.MCP
    
    expect(mcpIcon).toBeDefined()
    expect(mcpIcon.title).toBe('Model Context Protocol')
    expect(mcpIcon.slug).toBe('modelcontextprotocol')
    expect(mcpIcon.hex).toBe('000000')
    expect(mcpIcon.path).toBeDefined()
    expect(typeof mcpIcon.path).toBe('string')
    expect(mcpIcon.path.length).toBeGreaterThan(0)
  })

  it('should have svg property for MCP icon', () => {
    const mcpIcon = LANGUAGE_ICON_MAPPING.MCP
    
    expect(mcpIcon.svg).toBeDefined()
    expect(typeof mcpIcon.svg).toBe('string')
    expect(mcpIcon.svg).toContain('<svg')
    expect(mcpIcon.svg).toContain('Model Context Protocol')
  })
})
