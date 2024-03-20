import Banner from '../../components/banner/banner'
import FeatureItem from '../../components/features/featuresItem';
import DataFeatures from '../../components/features/dataFeatures'

function Home () {
    return (
        <div>
            <Banner/>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {DataFeatures.map((feature, index) => (
                    <FeatureItem 
                        key={index} 
                        image={feature.image}
                        alt={feature.alt} 
                        title={feature.title} 
                        content={feature.content} 
                    />    
                    ))}  
            </section>
        </div>
    )
}
export default Home;