/**
 * SectionLoader
 * HTML 섹션을 동적으로 로드하는 유틸리티 클래스
 */
class SectionLoader {
    static loadedSections = new Set();
    static pendingLoads = new Map();

    /**
     * HTML 섹션을 대상 컨테이너에 로드합니다
     * @param {string} targetId - 대상 컨테이너 ID
     * @param {string} htmlPath - HTML 파일 경로
     * @param {Function} [initCallback] - 로드 완료 후 실행할 콜백
     */
    static async load(targetId, htmlPath, initCallback) {
        // 1. 이미 로드된 섹션인지 확인
        if (this.loadedSections.has(targetId)) {
            if (typeof initCallback === 'function') {
                initCallback();
            }
            return;
        }

        // 2. 현재 로딩 중인지 확인
        if (this.pendingLoads.has(targetId)) {
            await this.pendingLoads.get(targetId);
            if (typeof initCallback === 'function') {
                initCallback();
            }
            return;
        }

        // 3. 새로 로드 시작
        const loadPromise = (async () => {
            try {
                const response = await fetch(htmlPath);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const html = await response.text();
                const container = document.getElementById(targetId);

                if (container) {
                    container.innerHTML = html;
                    this.loadedSections.add(targetId);
                    console.log(`[SectionLoader] Successfully loaded: ${targetId}`);

                    if (typeof initCallback === 'function') {
                        try {
                            initCallback();
                        } catch (e) {
                            console.error(`[SectionLoader] Error in initCallback for ${targetId}:`, e);
                        }
                    }
                } else {
                    console.error(`[SectionLoader] Target container #${targetId} not found`);
                }
            } catch (error) {
                console.error(`[SectionLoader] Failed to load ${targetId}:`, error);
                const container = document.getElementById(targetId);
                if (container) {
                    container.innerHTML = `
                        <div class="p-8 text-center">
                            <p class="text-red-500 mb-2">콘텐츠를 불러오지 못했습니다.</p>
                            <button onclick="location.reload()" class="text-sm bg-gray-200 px-3 py-1 rounded">새로고침</button>
                        </div>`;
                }
            } finally {
                this.pendingLoads.delete(targetId);
            }
        })();

        this.pendingLoads.set(targetId, loadPromise);
        await loadPromise;
    }

    /**
     * 섹션을 미리 로드합니다
     */
    static preload(targetId, htmlPath) {
        this.load(targetId, htmlPath);
    }
}

window.SectionLoader = SectionLoader;
console.log('[SectionLoader] Module loaded');
